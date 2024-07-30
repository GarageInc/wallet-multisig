import { hexToInt } from '@whalesheaven/chain-service/src/helpers/unitConversions'

import * as multisigSessionsReducer from '../../../store/reducers/multisigSessionsReducer'
import { getStore } from '../../../store/store'
import { blockchainCurves } from '../../constants/blockchainCurves'
import _thresholdEcdsa from '../index.js'
import * as ptg from '../paillier/paillier'

const recheckInterval = 500 // ms
const stepTimeout = 60000 // ms

class VaultSessionHandler {
  tsWalletShard: any

  constructor(tsWalletShard: any) {
    this.tsWalletShard = tsWalletShard
  }

  async generateThresholdKeyShare() {
    const curveName: string = blockchainCurves[this.tsWalletShard.blockchain]
    const privKey = await this.tsWalletShard.keyManager.getKeyByPath(this.tsWalletShard.path)

    const { p, q } = await ptg.generateRandomTriple(2048, true) // TODO move bitlength to constant

    const tsKeyShare = new _thresholdEcdsa.protocol.keys(
      this.tsWalletShard.partyId,
      this.tsWalletShard.minimumSigAmount,
      this.tsWalletShard.partiesAmount,
      hexToInt(privKey.privKey),
      null,
      null,
      null,
      curveName,
      p,
      q,
    )

    return tsKeyShare
  }

  async resolveMultisigSession() {
    // Everybody are in. Start vault generation
    const store = await getStore()

    const round1n2States = await this.performRound1n2VaultSession()
    await store.dispatch(multisigSessionsReducer.updateStep({ sessionId: this.tsWalletShard.sessionId, step: 2 }))

    const { round3States, round4States, partyShares } = await this.performRound3n4VaultSession(round1n2States)
    await store.dispatch(multisigSessionsReducer.updateStep({ sessionId: this.tsWalletShard.sessionId, step: 3 }))

    const calculatedXi = this.tsWalletShard.tsKeyShare.calculateXi(partyShares)
    const round5States = await this.performRound5VaultSession(calculatedXi)
    await store.dispatch(multisigSessionsReducer.updateStep({ sessionId: this.tsWalletShard.sessionId, step: 5 }))

    const yis = round1n2States.map(
      (state: { message: { decommitMessage: { y_i: any } } }) => state.message.decommitMessage.y_i,
    )
    const calculatedPubKeyPoint = this.tsWalletShard.tsKeyShare.calculatedY(yis)
    return calculatedPubKeyPoint.encodeCompressed('hex')
  }

  // Refactored
  async performRound1n2VaultSession() {
    const roundName = 'round1n2BroadcastMessage'
    const round1n2Message = this.tsWalletShard.tsKeyShare.getRound1n2BroadcastMessage()
    await this.tsWalletShard._updateVaultSession(this.tsWalletShard.sessionId, roundName, round1n2Message)

    const timeoutAt = +new Date() + stepTimeout // in 15 seconds
    let vaultSessionResponse
    let round1n2States

    while (Date.now() < timeoutAt) {
      vaultSessionResponse = await this.tsWalletShard.getSessionData()
      if (vaultSessionResponse.status !== 'pending') throw new Error('Multisig generation rejected')

      round1n2States = vaultSessionResponse.state.filter((state: { round: string }) => state.round == roundName)

      round1n2States.sort((m1: { fromParty: number }, m2: { fromParty: number }) => m1.fromParty - m2.fromParty)
      // TODO fail if duplicated messages present

      if (round1n2States.length == this.tsWalletShard.tsKeyShare.n) {
        for (let i = 0; i < round1n2States.length; i++) {
          round1n2States[i].message = JSON.parse(round1n2States[i].message)
        }
        round1n2States.forEach(
          (stateEntry: { fromParty: string | number; message: { commitMessage: { ek: any } } }) => {
            if (this.tsWalletShard.tsKeyShare.partyId != stateEntry.fromParty) {
              this.tsWalletShard.tsKeyShare.processRound1n2BroadcastMessage(stateEntry.fromParty, stateEntry.message)
            }
            this.tsWalletShard.paillierPubKeys[stateEntry.fromParty] = stateEntry.message.commitMessage.ek
          },
        )

        return round1n2States
      }

      await new Promise((r) => setTimeout(r, recheckInterval)) // wait a bit before next check
    }

    throw new Error('Multisig generation timeout at Round 1')
  }

  // Refactored
  async performRound3n4VaultSession(round1n2States: any[]) {
    const round3Name = 'performRound3VaultSession'
    const round4Name = 'performRound4VaultSession'

    const decommits: any = {}
    round1n2States.forEach((state: { fromParty: string | number; message: { decommitMessage: any } }) => {
      if (state.fromParty == this.tsWalletShard.tsKeyShare.partyId) return
      decommits[state.fromParty] = state.message.decommitMessage
    })

    const { round3Messages, round4Message, secretShares } =
      await this.tsWalletShard.tsKeyShare.getRound3n4BroadcastMessages(decommits)

    // Broadcast round 3 massages to each party
    for (let i = 0; i < Object.keys(round3Messages).length; i++) {
      const toParty = parseInt(Object.keys(round3Messages)[i])
      await this.tsWalletShard._updateVaultSession(
        this.tsWalletShard.sessionId,
        round3Name,
        round3Messages[toParty],
        toParty,
      )
    }

    // Broadcast round 4 message
    await this.tsWalletShard._updateVaultSession(this.tsWalletShard.sessionId, round4Name, round4Message)

    const timeoutAt = +new Date() + stepTimeout // in 60 seconds
    let vaultSessionResponse
    let round3States
    let round4States

    while (Date.now() < timeoutAt) {
      vaultSessionResponse = await this.tsWalletShard.getSessionData()
      if (vaultSessionResponse.status !== 'pending') throw new Error('Multisig generation rejected')

      round3States = vaultSessionResponse.state.filter(
        (state: { round: string; toParty: any }) =>
          state.round == round3Name && state.toParty == this.tsWalletShard.tsKeyShare.partyId,
      )
      round4States = vaultSessionResponse.state.filter((state: { round: string }) => state.round == round4Name)

      if (
        round3States.length == this.tsWalletShard.tsKeyShare.n - 1 &&
        round4States.length == this.tsWalletShard.tsKeyShare.n
      ) {
        for (let i = 0; i < round3States.length; i++) round3States[i].message = JSON.parse(round3States[i].message)
        for (let i = 0; i < round4States.length; i++) round4States[i].message = JSON.parse(round4States[i].message)

        const round3EncryptesMessages: any = {}
        round3States.forEach((stateEntry: { fromParty: string | number; message: any }) => {
          if (this.tsWalletShard.tsKeyShare.partyId != stateEntry.fromParty) {
            round3EncryptesMessages[stateEntry.fromParty] = stateEntry.message
          }
        })
        const partyShares = await this.tsWalletShard.tsKeyShare.decryptRound3Messages(
          decommits,
          round3EncryptesMessages,
        )
        partyShares[this.tsWalletShard.tsKeyShare.partyId] = secretShares[this.tsWalletShard.tsKeyShare.partyId]

        const round4Messages: any = {}
        round4States.forEach((stateEntry: { fromParty: string | number; message: any }) => {
          if (this.tsWalletShard.tsKeyShare.partyId != stateEntry.fromParty) {
            round4Messages[stateEntry.fromParty] = stateEntry.message
          }
        })
        const commitmetsOk = this.tsWalletShard.tsKeyShare.verifyRound4Messages(round4Messages, partyShares, decommits)

        return { round3States, round4States, partyShares }
      }

      await new Promise((r) => setTimeout(r, recheckInterval)) // wait a bit before next check
    }

    throw new Error('Multisig generation timeout at Round 3')
  }

  // Refactored
  async performRound5VaultSession(calculatedXi: any) {
    const roundName = 'round5BroadcastMessage'
    const round5broadcast = this.tsWalletShard.tsKeyShare.getRound5BroadcastMessage(calculatedXi)
    await this.tsWalletShard._updateVaultSession(this.tsWalletShard.sessionId, roundName, round5broadcast)

    const timeoutAt = +new Date() + stepTimeout // in 60 seconds
    let vaultSessionResponse
    let round5States

    while (Date.now() < timeoutAt) {
      vaultSessionResponse = await this.tsWalletShard.getSessionData()
      if (vaultSessionResponse.status !== 'pending') throw new Error('Multisig generation rejected')

      round5States = vaultSessionResponse.state.filter((state: { round: string }) => state.round == roundName)

      if (round5States.length == this.tsWalletShard.tsKeyShare.n) {
        for (let i = 0; i < round5States.length; i++) {
          round5States[i].message = JSON.parse(round5States[i].message)
        }
        round5States.forEach((stateEntry: { fromParty: any; message: any }) => {
          if (this.tsWalletShard.tsKeyShare.partyId != stateEntry.fromParty) {
            this.tsWalletShard.tsKeyShare.processRound5BroadcastMessage(stateEntry.message)
          }
        })

        return round5States
      }

      await new Promise((r) => setTimeout(r, recheckInterval)) // wait a bit before next check
    }

    throw new Error('Multisig generation timeout at Round 5')
  }
}

export default VaultSessionHandler
