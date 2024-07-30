import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import Browser from 'webextension-polyfill'

import Account from '../models/Account'
import MultisigSession from '../models/MultisigSession'
import * as snackbarReducer from '../store/reducers/snackbarReducer'
import { getStore } from '../store/store'
import NotifierController from './NotifierController'

export interface IAlarmData {
  name: string
  scheduledTime: number
}

class MultisigController {
  async initSession(blockchain: BlockchainNames, minimumSigAmount: number, participantsAmount: number, path: string) {
    const response = await MultisigSession.initSession(blockchain, minimumSigAmount, participantsAmount, path)
    const { sessionId } = response

    if (sessionId) {
      return response
    } else {
      NotifierController.create('Multisig', 'Multisig creation has failed.')
      return response
    }
  }

  async getSessionData(sessionId: string) {
    const multisigSession = new MultisigSession(sessionId)
    const sessionData = await multisigSession.getSessionData()

    if (sessionData.status == 'pending') {
      return sessionData
    } else {
      throw new Error("Can't join inactive session")
    }
  }

  async joinSession(sessionId: string, path: string) {
    const multisigSession = new MultisigSession(sessionId)
    const response = await multisigSession.joinSession(path)

    if (response._id) {
      return response
    } else {
      NotifierController.create('Multisig', 'Failed to join multisig.')
      return response
    }
  }

  async joinSessionAndProvideSignedAddress(sessionId: string, path: string) {
    const multisigSession = new MultisigSession(sessionId)
    const response = await multisigSession.joinSession(path)

    if (response._id) {
      const participantsJoined = await multisigSession.awaitParticipants()
      Browser.alarms.clear(`resolveMultisigSession:${sessionId}`)

      if (participantsJoined) {
        const result = await multisigSession.resolveSession()

        if (result?.calculatedAddress) {
          const addressWithBlockchain = `${response.blockchain}(${result?.calculatedAddress})`

          const account = await Account.getActiveAccount()

          if (!account) throw new Error('No active account.')

          const signature = await account.signMessage(addressWithBlockchain)

          NotifierController.create('Multisig', 'New multisig has been created.')

          return [signature, addressWithBlockchain]
        }
      }
    }

    await multisigSession.rejectSession()
    return response
  }

  async resolveSession(alarmData: IAlarmData, sessionId: string) {
    const store = await getStore()
    const { multisigSessions } = store.getState()

    const session = multisigSessions.sessions[sessionId]
    const isSessionExpired = !session?.expiresAt || Date.now() > session.expiresAt

    if (!isSessionExpired) {
      try {
        const multisigSession = new MultisigSession(sessionId)
        const participantsJoined = await multisigSession.awaitParticipants()

        if (participantsJoined) {
          Browser.alarms.clear(alarmData.name)
          const result = await multisigSession.resolveSession()

          if (result?.calculatedAddress) {
            NotifierController.create('Multisig', 'New multisig has been created.')
            return true
          } else {
            NotifierController.create('Multisig', 'New multisig creation has failed. ')
            return false
          }
        }
      } catch (e) {
        await store.dispatch(snackbarReducer.setError(e.message))
        await this.rejectSession(alarmData, sessionId)
      }

      return false
    }

    await store.dispatch(snackbarReducer.setError('Session has expired'))
    await this.rejectSession(alarmData, sessionId)
    return false
  }

  async rejectSession(alarmData: IAlarmData, sessionId: string) {
    const multisigSession = new MultisigSession(sessionId)
    await multisigSession.rejectSession()
    Browser.alarms.clear(alarmData.name)
    NotifierController.create('Multisig', 'New multisig creation has failed.')

    return { sessionId }
  }
}
export default MultisigController
