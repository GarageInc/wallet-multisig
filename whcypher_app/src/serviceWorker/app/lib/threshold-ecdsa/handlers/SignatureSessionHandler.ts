import { hexToInt } from '@whalesheaven/chain-service/src/helpers/unitConversions'
import _cryptoJs from 'crypto-js'

import * as walletRequestsReducer from '../../../store/reducers/walletRequestsReducer'
import { getStore } from '../../../store/store'
import { blockchainCurves } from '../../constants/blockchainCurves'
import _thresholdEcdsa from '../index.js'

const pairedSessionTimeout = 600000 // ms
const singleSessionTimeout = 300000 // ms
const recheckInterval = 500 // ms
const stepTimeout = 60000 // ms

class SignatureSessionHandler {
  tsWalletShard: any
  adapter: any
  sessionId: string
  tsSignatureAll: any[]
  messageHashAll: any[]
  timeoutAt: number
  signatureSessionResponse: any

  constructor(tsWalletShard: any, sessionId: string) {
    this.tsWalletShard = tsWalletShard
    this.adapter = undefined
    this.sessionId = sessionId
    this.tsSignatureAll = []
    this.messageHashAll = []
    this.timeoutAt = 0
  }

  async initThresholdKeyShareFromData(tsVaultData: { secretsEncrypted: any }) {
    const curveName = blockchainCurves[this.tsWalletShard.blockchain]
    const privKey = await this.tsWalletShard.keyManager.getKeyByPath(this.tsWalletShard.path)

    const secretsEncryptedSerialized = _cryptoJs.enc.Base64.parse(tsVaultData.secretsEncrypted).toString(
      _cryptoJs.enc.Utf8,
    )
    const secretsSerialized = _cryptoJs.AES.decrypt(secretsEncryptedSerialized, privKey.privKey).toString(
      _cryptoJs.enc.Utf8,
    )
    const { paillier, x_i } = JSON.parse(secretsSerialized)

    const tsKeyShare = new _thresholdEcdsa.protocol.keys(
      this.tsWalletShard.partyId,
      this.tsWalletShard.minimumSigAmount,
      this.tsWalletShard.partiesAmount,
      hexToInt(privKey.privKey),
      hexToInt(x_i),
      null,
      null,
      curveName,
      hexToInt(paillier.p),
      hexToInt(paillier.q),
    )

    return tsKeyShare
  }

  initSignatureData(sessionId: string, signatureSessionResponse: any, adapter: any) {
    this.adapter = adapter
    this.sessionId = sessionId
    this.signatureSessionResponse = signatureSessionResponse

    const partyIds = signatureSessionResponse.partiesState.map((p: { sequence: any }) => p.sequence)
    this.messageHashAll = this.adapter.getHash()
    this.tsSignatureAll = this.messageHashAll.map(
      (h: any) =>
        new _thresholdEcdsa.protocol.signature(
          partyIds,
          this.tsWalletShard.partyId,
          this.tsWalletShard.tsKeyShare.x_i,
          this.tsWalletShard.tsKeyShare.curve,
        ),
    )
  }

  // Refactored
  async resolveSignatureSession() {
    // Everybody are in. Start signature generation
    const store = await getStore()

    let timeoutAt = Date.now()
    if (this.signatureSessionResponse.dealHash) {
      timeoutAt += pairedSessionTimeout
    } else {
      timeoutAt += singleSessionTimeout
    }
    this.timeoutAt = timeoutAt

    const { round1StatesAll, round1MessageAll } = await this.performRound1SignatureSession(
      this.sessionId,
      this.tsSignatureAll,
    )
    await store.dispatch(walletRequestsReducer.updateRequestBySessionId({ sessionId: this.sessionId, processStep: 1 }))

    const { round2StatesAll, msgBsGammaAll, msgBsOmegaAll, alphaGammasAll, alphaOmegasAll } =
      await this.performRound2SignatureSession(this.sessionId, this.tsSignatureAll, round1StatesAll)
    await store.dispatch(walletRequestsReducer.updateRequestBySessionId({ sessionId: this.sessionId, processStep: 2 }))

    const { round3StatesAll, delta_iAll, sigma_iAll, deltaInvAll } = await this.performRound3SignatureSession(
      this.sessionId,
      this.tsSignatureAll,
      msgBsGammaAll,
      msgBsOmegaAll,
      alphaGammasAll,
      alphaOmegasAll,
    )
    await store.dispatch(walletRequestsReducer.updateRequestBySessionId({ sessionId: this.sessionId, processStep: 3 }))

    const { rBigAll, s_iAll } = await this.performRound4SignatureSession(
      this.sessionId,
      this.tsSignatureAll,
      this.messageHashAll,
      round1MessageAll,
      deltaInvAll,
    )
    await store.dispatch(walletRequestsReducer.updateRequestBySessionId({ sessionId: this.sessionId, processStep: 4 }))

    const { round5StatesAll, round5MessageAll, vBigAll, aBigAll } = await this.performRound5n6SignatureSession(
      this.sessionId,
      this.tsSignatureAll,
      this.messageHashAll,
    )
    await store.dispatch(walletRequestsReducer.updateRequestBySessionId({ sessionId: this.sessionId, processStep: 5 }))

    const { round7StatesAll } = await this.performRound7n8SignatureSession(this.sessionId, this.tsSignatureAll)
    await store.dispatch(walletRequestsReducer.updateRequestBySessionId({ sessionId: this.sessionId, processStep: 7 }))
  }

  async performLastRoundSyncronous(signatureSessionResponse: any) {
    const store = await getStore()

    const { round9StatesAll } = await this.performRound9SignatureSession(
      this.sessionId,
      this.tsSignatureAll,
      this.timeoutAt,
      !!signatureSessionResponse.dealHash,
    )
    await store.dispatch(walletRequestsReducer.updateRequestBySessionId({ sessionId: this.sessionId, processStep: 9 }))

    const signatureAll: string[] = []

    for (let i = 0; i < this.tsSignatureAll.length; i++) {
      const signatureShares = round9StatesAll[i].map((roundMessage: { message: any }) => roundMessage.message)
      signatureAll.push(this.tsSignatureAll[i].calculateSignature(signatureShares))
    }

    return { signatureAll }
  }

  async performLastRoundAsyncronous(signatureSessionResponse: any) {
    await this.broadcastRound9SignatureSession(
      this.sessionId,
      this.tsSignatureAll,
      this.timeoutAt,
      !!signatureSessionResponse.dealHash,
    )
  }

  // Refactored
  async recoverSignatureSession() {
    let timeoutAt = Date.now()
    if (this.signatureSessionResponse.dealHash) {
      timeoutAt += pairedSessionTimeout
    } else {
      timeoutAt += singleSessionTimeout
    }
    this.timeoutAt = timeoutAt

    const round3Name = 'performRound3SignatureSession'
    const round4Name = 'performRound4SignatureSession'
    const deltaInvAll: any[] = []
    const rBigAll: any[] = []

    for (let i = 0; i < this.tsSignatureAll.length; i++) {
      const round3States = this.signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == round3Name && state.subsessionId == i,
      )
      const deltas = round3States.map((state: { message: string }) => JSON.parse(state.message))
      deltaInvAll.push(this.tsSignatureAll[i].round3CalculateDeltaInverse(deltas))

      const round4States = this.signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == round4Name && state.subsessionId == i,
      )
      const decommits = round4States.map((state: { message: string }) => JSON.parse(state.message))
      rBigAll.push(this.tsSignatureAll[i].round4CalculateR(decommits, deltaInvAll[i]))
    }

    const { round9StatesAll } = await this.performRound9SignatureSessionRecovery(
      this.sessionId,
      this.tsSignatureAll,
      this.timeoutAt,
      !!this.signatureSessionResponse.dealHash,
    )

    const signatureAll: any[] = []

    for (let i = 0; i < this.tsSignatureAll.length; i++) {
      const signatureShares = round9StatesAll[i].map((roundMessage: { message: any }) => roundMessage.message)
      signatureAll.push(this.tsSignatureAll[i].calculateSignature(signatureShares))
    }

    return { signatureAll }
  }

  // Refactored
  async recoverSignature() {
    if (this.signatureSessionResponse.status !== 'pending') {
      return {
        error: 'Transaction signature expired',
        adapter: this.adapter,
        sessionData: this.signatureSessionResponse,
      }
    }

    const round3Name = 'performRound3SignatureSession'
    const round4Name = 'performRound4SignatureSession'
    const deltaInvAll: any[] = []
    const rBigAll: any[] = []

    for (let i = 0; i < this.tsSignatureAll.length; i++) {
      const round3States = this.signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == round3Name && state.subsessionId == i,
      )
      const deltas = round3States.map((state: { message: string }) => JSON.parse(state.message))
      deltaInvAll.push(this.tsSignatureAll[i].round3CalculateDeltaInverse(deltas))

      const round4States = this.signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == round4Name && state.subsessionId == i,
      )
      const decommits = round4States.map((state: { message: string }) => JSON.parse(state.message))
      rBigAll.push(this.tsSignatureAll[i].round4CalculateR(decommits, deltaInvAll[i]))
    }

    const round9Name = 'performRound9SignatureSession'
    const round9StatesAll: any[] = []

    for (let i = 0; i < this.tsSignatureAll.length; i++) {
      const round9States = this.signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == round9Name && state.subsessionId == i,
      )
      round9StatesAll.push(round9States)
    }

    if (round9StatesAll[0].length < this.tsWalletShard.minimumSigAmount) return null

    const signatureAll: any[] = []

    for (let i = 0; i < this.tsSignatureAll.length; i++) {
      const signatureShares = round9StatesAll[i].map((roundMessage: { message: string }) =>
        JSON.parse(roundMessage.message),
      )
      signatureAll.push(this.tsSignatureAll[i].calculateSignature(signatureShares))
    }

    return { signatureAll }
  }

  // Refactored
  async performRound1SignatureSession(signatureSessionId: any, tsSignatureAll: string | any[]) {
    const roundName = 'performRound1SignatureSession'

    const round1MessageAll: any[] = []
    const sessionMessagesAll: any[] = []

    for (let i = 0; i < tsSignatureAll.length; i++) {
      const round1Message = tsSignatureAll[i].getRound1n4BroadcastMessage()
      const round1MessageA = tsSignatureAll[i].getRound1MessageA(this.tsWalletShard.tsKeyShare.ek)

      round1MessageAll.push(round1Message)

      sessionMessagesAll.push({ commit: round1Message.commit, msgA: round1MessageA })
    }

    await this.tsWalletShard._updateSignatureSession(signatureSessionId, roundName, sessionMessagesAll)

    const timeoutAt = +new Date() + stepTimeout // in 60 seconds
    let signatureSessionResponse
    const round1StatesAll: any[] = []

    while (Date.now() < timeoutAt) {
      signatureSessionResponse = await this.tsWalletShard.getSignatureSessionData(signatureSessionId)
      if (signatureSessionResponse.status !== 'pending') throw new Error('Signature generation rejected')

      let round1States = signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == 0,
      )

      if (this.tsWalletShard.tsKeyShare.t == round1States.length) {
        for (let i = 0; i < tsSignatureAll.length; i++) {
          round1States = signatureSessionResponse.state.filter(
            (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == i,
          )
          for (let j = 0; j < round1States.length; j++) round1States[j].message = JSON.parse(round1States[j].message)
          round1States.sort((m1: { fromParty: number }, m2: { fromParty: number }) => m1.fromParty - m2.fromParty)
          round1StatesAll.push(round1States)
        }
        return { round1StatesAll, round1MessageAll }
      }

      await new Promise((r) => setTimeout(r, recheckInterval)) // wait a bit before next check
    }

    throw new Error('Signature generation timeout at Round 1')
  }

  // Refactored
  async performRound2SignatureSession(
    signatureSessionId: any,
    tsSignatureAll: string | any[],
    round1StatesAll: string | any[],
  ) {
    const roundName = 'performRound2SignatureSession'

    const msgBsGammaAll: any = {}
    const msgBsOmegaAll: any = {}

    for (let i = 0; i < round1StatesAll.length; i++) {
      const round1States = round1StatesAll[i]

      round1States.forEach((state: { fromParty: string | number; message: { msgA: any } }) => {
        if (state.fromParty == this.tsWalletShard.tsKeyShare.partyId) return

        if (typeof msgBsGammaAll[state.fromParty] == 'undefined') msgBsGammaAll[state.fromParty] = []
        if (typeof msgBsOmegaAll[state.fromParty] == 'undefined') msgBsOmegaAll[state.fromParty] = []

        msgBsGammaAll[state.fromParty].push(
          tsSignatureAll[i].getRound2GammaMessageB(
            state.message.msgA,
            this.tsWalletShard.paillierPubKeys[state.fromParty],
          ),
        )
        msgBsOmegaAll[state.fromParty].push(
          tsSignatureAll[i].getRound2OmegaMessageB(
            state.message.msgA,
            this.tsWalletShard.paillierPubKeys[state.fromParty],
          ),
        )
      })
    }

    // Broadcast round 2 massages to each party
    for (let i = 0; i < Object.keys(msgBsGammaAll).length; i++) {
      const toParty = parseInt(Object.keys(msgBsGammaAll)[i])
      const sessionMessagesAll: any[] = []

      for (let j = 0; j < msgBsGammaAll[toParty].length; j++) {
        sessionMessagesAll.push([msgBsGammaAll[toParty][j].messageB, msgBsOmegaAll[toParty][j].messageB])
      }

      await this.tsWalletShard._updateSignatureSession(signatureSessionId, roundName, sessionMessagesAll, toParty)
    }

    const timeoutAt = +new Date() + stepTimeout // in 60 seconds
    let signatureSessionResponse
    const round2StatesAll: any[] = []

    // We should send a message to each other party, hence t parties, should send t-1 messages
    const finalMessagesCount = this.tsWalletShard.tsKeyShare.t * (this.tsWalletShard.tsKeyShare.t - 1)

    while (Date.now() < timeoutAt) {
      signatureSessionResponse = await this.tsWalletShard.getSignatureSessionData(signatureSessionId)
      if (signatureSessionResponse.status !== 'pending') throw new Error('Signature generation rejected')

      let round2States = signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == 0,
      )
      if (finalMessagesCount == round2States.length) {
        const alphaGammasAll: any = {}
        const alphaOmegasAll: any = {}

        for (let i = 0; i < tsSignatureAll.length; i++) {
          round2States = signatureSessionResponse.state.filter(
            (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == i,
          )
          for (let j = 0; j < round2States.length; j++) round2States[j].message = JSON.parse(round2States[j].message)

          round2States.forEach((state: { toParty: any; fromParty: string | number; message: any[] }) => {
            if (state.toParty == this.tsWalletShard.tsKeyShare.partyId) {
              if (typeof alphaGammasAll[state.fromParty] == 'undefined') alphaGammasAll[state.fromParty] = []
              if (typeof alphaOmegasAll[state.fromParty] == 'undefined') alphaOmegasAll[state.fromParty] = []

              alphaGammasAll[state.fromParty].push(
                tsSignatureAll[i].verifyRound2AndGetAlpha(state.message[0], this.tsWalletShard.tsKeyShare.dk),
              )
              alphaOmegasAll[state.fromParty].push(
                tsSignatureAll[i].verifyRound2AndGetAlpha(state.message[1], this.tsWalletShard.tsKeyShare.dk),
              )
            }
          })

          round2StatesAll.push(round2States)
        }

        return {
          round2StatesAll,
          msgBsGammaAll,
          msgBsOmegaAll,
          alphaGammasAll,
          alphaOmegasAll,
        }
      }

      await new Promise((r) => setTimeout(r, recheckInterval)) // wait a bit before next check
    }

    throw new Error(`Signature generation timeout at Round 2`)
  }

  // Refactored
  async performRound3SignatureSession(
    signatureSessionId: any,
    tsSignatureAll: string | any[],
    msgBsGammaAll: { [x: string]: { beta: any }[] },
    msgBsOmegaAll: { [x: string]: { beta: any }[] },
    alphaGammasAll: any,
    alphaOmegasAll: any,
  ) {
    const roundName = 'performRound3SignatureSession'
    const delta_iAll: any[] = []
    const sigma_iAll: any[] = []

    const alphasAll = alphaGammasAll
    const betasAll: any = {}
    const musAll = alphaOmegasAll
    const upsilonsAll: any = {}

    for (const index in msgBsGammaAll) {
      if (typeof betasAll[index] == 'undefined') betasAll[index] = []
      for (let i = 0; i < msgBsGammaAll[index].length; i++) betasAll[index].push(msgBsGammaAll[index][i].beta)
    }
    for (const index in msgBsOmegaAll) {
      if (typeof upsilonsAll[index] == 'undefined') upsilonsAll[index] = []
      for (let i = 0; i < msgBsOmegaAll[index].length; i++) upsilonsAll[index].push(msgBsOmegaAll[index][i].beta)
    }

    for (let i = 0; i < tsSignatureAll.length; i++) {
      const alphas: any = {}
      const betas: any = {}
      for (const index in alphasAll) alphas[index] = alphasAll[index][i]
      for (const index in betasAll) betas[index] = betasAll[index][i]
      delta_iAll.push(this.tsSignatureAll[i].round3CalculateDeltaI(alphas, betas))

      const mus: any = {}
      const upsilons: any = {}
      for (const index in musAll) mus[index] = musAll[index][i]
      for (const index in upsilonsAll) upsilons[index] = upsilonsAll[index][i]
      sigma_iAll.push(this.tsSignatureAll[i].round3CalculateSigmaI(mus, upsilons))
    }

    await this.tsWalletShard._updateSignatureSession(signatureSessionId, roundName, delta_iAll)

    const timeoutAt = +new Date() + stepTimeout // in 60 seconds
    let signatureSessionResponse
    const round3StatesAll: any[] = []
    const deltaInvAll: any[] = []

    while (Date.now() < timeoutAt) {
      signatureSessionResponse = await this.tsWalletShard.getSignatureSessionData(signatureSessionId)
      if (signatureSessionResponse.status !== 'pending') throw new Error('Signature generation rejected')

      let round3States = signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == 0,
      )

      if (this.tsWalletShard.tsKeyShare.t == round3States.length) {
        for (let i = 0; i < tsSignatureAll.length; i++) {
          round3States = signatureSessionResponse.state.filter(
            (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == i,
          )

          for (let j = 0; j < round3States.length; j++) round3States[j].message = JSON.parse(round3States[j].message)
          round3States.sort((m1: { fromParty: number }, m2: { fromParty: number }) => m1.fromParty - m2.fromParty)

          round3StatesAll.push(round3States)

          const deltas = round3States.map((state: { message: any }) => state.message)
          deltaInvAll.push(this.tsSignatureAll[i].round3CalculateDeltaInverse(deltas))
        }

        return { round3StatesAll, delta_iAll, sigma_iAll, deltaInvAll }
      }

      await new Promise((r) => setTimeout(r, recheckInterval)) // wait a bit before next check
    }

    throw new Error('Signature generation timeout at Round 3')
  }

  async performRound4SignatureSession(
    signatureSessionId: any,
    tsSignatureAll: string | any[],
    messageHashAll: any[],
    round1MessageAll: any[],
    deltaInvAll: any[],
  ) {
    const roundName = 'performRound4SignatureSession'

    const roundMessageAll: any[] = []
    for (let i = 0; i < tsSignatureAll.length; i++) roundMessageAll.push(round1MessageAll[i].decommit)

    await this.tsWalletShard._updateSignatureSession(signatureSessionId, roundName, roundMessageAll)

    const timeoutAt = +new Date() + stepTimeout // in 60 seconds
    let signatureSessionResponse
    const rBigAll: any[] = []
    const s_iAll: any[] = []

    while (Date.now() < timeoutAt) {
      signatureSessionResponse = await this.tsWalletShard.getSignatureSessionData(signatureSessionId)
      if (signatureSessionResponse.status !== 'pending') throw new Error('Signature generation rejected')

      let round4States = signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == 0,
      )

      if (this.tsWalletShard.tsKeyShare.t == round4States.length) {
        for (let i = 0; i < tsSignatureAll.length; i++) {
          round4States = signatureSessionResponse.state.filter(
            (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == i,
          )
          for (let j = 0; j < round4States.length; j++) round4States[j].message = JSON.parse(round4States[j].message)

          const decommits: any[] = []
          for (let j = 0; j < round4States.length; j++) decommits.push(round4States[j].message)

          rBigAll.push(this.tsSignatureAll[i].round4CalculateR(decommits, deltaInvAll[i]))
          s_iAll.push(this.tsSignatureAll[i].round4CalculateSi(messageHashAll[i]))
        }

        return { rBigAll, s_iAll }
      }

      await new Promise((r) => setTimeout(r, recheckInterval)) // wait a bit before next check
    }

    throw new Error('Signature generation timeout at Round 4')
  }

  // Refactored
  async performRound5n6SignatureSession(
    signatureSessionId: any,
    tsSignatureAll: string | any[],
    messageHashAll: any[],
  ) {
    const roundName = 'performRound5SignatureSession'

    const messageAll: any[] = []
    const round5MessageAll: any[] = []

    for (let i = 0; i < tsSignatureAll.length; i++) {
      const round5Message = this.tsSignatureAll[i].getRound5ABBroadcastMessage()
      round5MessageAll.push(round5Message)
      messageAll.push({
        commit: round5Message.commit,
        decommit: round5Message.decommit,
        proof: [round5Message.dlog_proof_rho_i, round5Message.zk_proof_V_i],
      })
    }

    await this.tsWalletShard._updateSignatureSession(signatureSessionId, roundName, messageAll)

    const timeoutAt = +new Date() + stepTimeout // in 60 seconds
    let signatureSessionResponse
    const round5StatesAll: any[] = []
    const vBigAll: any[] = []
    const aBigAll: any[] = []

    while (Date.now() < timeoutAt) {
      signatureSessionResponse = await this.tsWalletShard.getSignatureSessionData(signatureSessionId)
      if (signatureSessionResponse.status !== 'pending') throw new Error('Signature generation rejected')

      let round5States = signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == 0,
      )

      if (this.tsWalletShard.tsKeyShare.t == round5States.length) {
        for (let i = 0; i < tsSignatureAll.length; i++) {
          round5States = signatureSessionResponse.state.filter(
            (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == i,
          )
          for (let j = 0; j < round5States.length; j++) round5States[j].message = JSON.parse(round5States[j].message)

          round5States.sort((m1: { fromParty: number }, m2: { fromParty: number }) => m1.fromParty - m2.fromParty)
          round5StatesAll.push(round5States)

          for (let j = 0; j < round5States.length; j++) {
            if (round5States[j].fromParty == this.tsWalletShard.tsKeyShare.partyId) continue
            const message = {
              commit: round5States[j].message.commit,
              decommit: round5States[j].message.decommit,
              dlog_proof_rho_i: round5States[j].message.proof[0],
              zk_proof_V_i: round5States[j].message.proof[1],
            }
            tsSignatureAll[i].round5ABVerify(message)
          }

          const round5Messages: any[] = []
          for (let j = 0; j < round5States.length; j++) round5Messages.push(round5States[j].message)

          vBigAll.push(
            this.tsSignatureAll[i].round6CalculateV(
              messageHashAll[i],
              this.tsWalletShard.calculatedPubKey,
              round5Messages,
            ),
          )
          aBigAll.push(this.tsSignatureAll[i].round6CalculateA(round5Messages))
        }

        return {
          round5StatesAll,
          round5MessageAll,
          vBigAll,
          aBigAll,
        }
      }

      await new Promise((r) => setTimeout(r, recheckInterval)) // wait a bit before next check
    }

    throw new Error('Signature generation timeout at Round 5')
  }

  // Refactored
  async performRound7n8SignatureSession(signatureSessionId: any, tsSignatureAll: string | any[]) {
    const roundName = 'performRound7SignatureSession'

    const messageAll: any[] = []

    for (let i = 0; i < tsSignatureAll.length; i++) {
      const round7Message = tsSignatureAll[i].getRound7CDBroadcastMessage()
      messageAll.push({ commit: round7Message.commit, decommit: round7Message.decommit })
    }

    await this.tsWalletShard._updateSignatureSession(signatureSessionId, roundName, messageAll)

    const timeoutAt = +new Date() + stepTimeout // in 60 seconds
    let signatureSessionResponse
    const round7StatesAll: any[] = []

    while (Date.now() < timeoutAt) {
      signatureSessionResponse = await this.tsWalletShard.getSignatureSessionData(signatureSessionId)
      if (signatureSessionResponse.status == 'rejected') throw new Error('Signature generation rejected')

      let round7States = signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == 0,
      )

      if (this.tsWalletShard.tsKeyShare.t == round7States.length) {
        for (let i = 0; i < tsSignatureAll.length; i++) {
          round7States = signatureSessionResponse.state.filter(
            (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == i,
          )
          for (let j = 0; j < round7States.length; j++) round7States[j].message = JSON.parse(round7States[j].message)

          round7StatesAll.push(round7States)

          const round7Messages: any[] = []
          for (let j = 0; j < round7States.length; j++) {
            round7Messages.push(round7States[j].message)
            if (round7States[j].fromParty != this.tsWalletShard.tsKeyShare.partyId)
              tsSignatureAll[i].round7CDVerify(round7States[j].message)
          }

          tsSignatureAll[i].round7VerifyUT(round7Messages)
        }

        return { round7StatesAll }
      }

      await new Promise((r) => setTimeout(r, recheckInterval)) // wait a bit before next check
    }

    throw new Error('Signature generation timeout at Round 7')
  }

  // Refactored
  async performRound9SignatureSession(
    signatureSessionId: any,
    tsSignatureAll: string | any[],
    sessionTimeoutAt: number,
    applySessionTimeout: boolean,
  ) {
    const roundName = 'performRound9SignatureSession'

    const messageAll: any[] = []
    for (let i = 0; i < tsSignatureAll.length; i++) messageAll.push(this.tsSignatureAll[i].getRound9EBroadcastMessage())

    await this.tsWalletShard._updateSignatureSession(signatureSessionId, roundName, messageAll)

    let signatureSessionResponse
    const round9StatesAll: any[] = []
    let roundTimeoutAt

    if (applySessionTimeout) {
      roundTimeoutAt = sessionTimeoutAt
    } else {
      roundTimeoutAt = +new Date() + stepTimeout // in 60 seconds
    }

    while (Date.now() < roundTimeoutAt) {
      signatureSessionResponse = await this.tsWalletShard.getSignatureSessionData(signatureSessionId)
      if (signatureSessionResponse.status == 'rejected') throw new Error('Signature generation rejected')

      let round9States = signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == 0,
      )

      if (this.tsWalletShard.tsKeyShare.t == round9States.length) {
        for (let i = 0; i < tsSignatureAll.length; i++) {
          round9States = signatureSessionResponse.state.filter(
            (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == i,
          )
          for (let j = 0; j < round9States.length; j++) round9States[j].message = JSON.parse(round9States[j].message)
          round9States.sort((m1: { fromParty: number }, m2: { fromParty: number }) => m1.fromParty - m2.fromParty)
          round9StatesAll.push(round9States)
        }
        return { round9StatesAll }
      }

      await new Promise((r) => setTimeout(r, recheckInterval)) // wait a bit before next check
    }

    throw new Error('Signature generation timeout at Round 9')
  }

  // Refactored
  async broadcastRound9SignatureSession(
    signatureSessionId: any,
    tsSignatureAll: string | any[],
    sessionTimeoutAt: number,
    applaySessionTimeout: boolean,
  ) {
    const roundName = 'performRound9SignatureSession'

    const messageAll: any[] = []
    for (let i = 0; i < tsSignatureAll.length; i++) messageAll.push(this.tsSignatureAll[i].getRound9EBroadcastMessage())

    await this.tsWalletShard._updateSignatureSession(signatureSessionId, roundName, messageAll)
  }

  // Refactored
  async performRound9SignatureSessionRecovery(
    signatureSessionId: any,
    tsSignatureAll: string | any[],
    sessionTimeoutAt: number,
    applySessionTimeout: boolean,
  ) {
    const roundName = 'performRound9SignatureSession'

    let signatureSessionResponse
    let round9StatesAll: any
    let roundTimeoutAt

    if (applySessionTimeout) {
      roundTimeoutAt = sessionTimeoutAt
    } else {
      roundTimeoutAt = +new Date() + stepTimeout // in 60 seconds
    }

    while (Date.now() < roundTimeoutAt) {
      signatureSessionResponse = await this.tsWalletShard.getSignatureSessionData(signatureSessionId)
      if (signatureSessionResponse.status == 'rejected') throw new Error('Signature generation rejected')

      let round9States = signatureSessionResponse.state.filter(
        (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == 0,
      )

      if (this.tsWalletShard.tsKeyShare.t == round9States.length) {
        for (let i = 0; i < tsSignatureAll.length; i++) {
          round9States = signatureSessionResponse.state.filter(
            (state: { round: string; subsessionId: number }) => state.round == roundName && state.subsessionId == i,
          )
          for (let j = 0; j < round9States.length; j++) round9States[j].message = JSON.parse(round9States[j].message)
          round9States.sort((m1: { fromParty: number }, m2: { fromParty: number }) => m1.fromParty - m2.fromParty)
          round9StatesAll.push(round9States)
        }
        return { round9StatesAll }
      }

      await new Promise((r) => setTimeout(r, recheckInterval)) // wait a bit before next check
    }

    throw new Error('Signature generation timeout at Round 9')
  }
}

export default SignatureSessionHandler
