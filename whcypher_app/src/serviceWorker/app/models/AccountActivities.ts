import { v4 as uuidv4 } from 'uuid'

import ActivitiesDB from '../../db/ActivitiesDB'
import { IActivity, setActivities } from '../store/reducers/accountActivitiesReducer'
import { IWalletData } from '../store/reducers/walletsReducer'
import { getStore } from '../store/store'
import { getActivitiesApi, sendActivityApi } from '../utils/api'
import { filterObjectArraysByMatchingKeyValues } from '../utils/arrayHelper'
import { isNft } from '../utils/assetTypes'
import getFormattedDate from '../utils/dateFormatter'
import { waitForSync } from '../utils/dbHelper'
import Account from './Account'
import TransactionSession from './TransactionSession'

class AccountActivities {
  accountIndex?: number
  account?: Account | null

  constructor(accountIndex?: number, account?: Account) {
    this.accountIndex = accountIndex
    this.account = account
  }
  async addNewActivity(label: string, data: any, labelError = false) {
    const account = await this.getAccount()

    if (!account) {
      return
    }
    const activity: IActivity = {
      id: uuidv4(),
      accountKey: await account.getAccountPubKey(),
      payload: {
        label,
        labelError,
        time: getFormattedDate(),
        initiatedAt: Date.now(),
        data,
      },
    }

    await this._appendActivityToDB(activity)
    await this.updateAccountActivities()

    const syncActivitiesWithServerEnabled = await this._syncActivitiesWithServerEnabled()
    if (syncActivitiesWithServerEnabled) await this._syncActivityToServer(activity)
  }

  // Refactored
  async newAccount() {
    await this.addNewActivity('New account', [
      {
        field: 'NoData',
        value: 'Congratulations! Now you can create a new multisig wallet with your friend!',
        link: 'https://www.totalsig.com',
      },
    ])
  }

  // Refactored
  async addNewWallet(walletDetails: IWalletData, label = `New ${walletDetails.blockchain} wallet`) {
    await this.addNewActivity(label, [
      { field: 'Network', value: walletDetails.blockchain },
      { field: 'Address', value: walletDetails.calculatedAddress },
      { field: 'Min approves to spend', value: walletDetails.minimumSigAmount },
      { field: 'Total parties', value: walletDetails.partiesAmount },
      {
        field: 'Participants',
        value:
          walletDetails.joinedParties && walletDetails.joinedParties.length > 0
            ? walletDetails.joinedParties
            : walletDetails.participants,
      },
    ])
  }

  // Refactored
  async addNewSpend(transactionSession: TransactionSession, transactionDetails: any) {
    const walletData = await transactionSession.getWalletData()

    let joinedParties
    if (transactionSession.requestData) {
      joinedParties = transactionSession.requestData.partiesState.map((partyState: any) => partyState.accountPubKey)
    } else {
      joinedParties = []
    }

    const { requestData } = transactionSession
    const { assetType, assetId } = requestData

    let valueInfo
    if (isNft(assetType)) {
      valueInfo = {
        field: 'Token ID',
        value: transactionDetails.value,
        subvalue: transactionDetails.ticker,
        assetType,
        assetId,
      }
    } else {
      valueInfo = { field: 'Amount', value: transactionDetails.value, subvalue: transactionDetails.ticker }
    }

    if (walletData) {
      await this.addNewActivity(`${transactionDetails.ticker} transaction`, [
        { field: 'Network', value: walletData.blockchain },
        { field: 'Address From', value: walletData.calculatedAddress },
        { field: 'Address To', value: transactionSession.requestData?.destination },
        valueInfo,
        { field: 'Fee', value: transactionDetails.networkFee, subvalue: transactionDetails.networkFeeTicker },
        {
          field: 'Trx ID',
          value: transactionSession.transactionId,
          error: transactionSession.transactionId ? null : 'Transaction was unsuccessful',
        },
        { field: 'Approved by', value: joinedParties, hint: 'List of users who confirmed this transaction' },
        { field: 'Min approves to spend', value: walletData.minimumSigAmount, hint: 'Minimum amount of confirmations' },
      ])
    }
  }

  // Refactored
  async hasLocalActivities() {
    const localActivities = await this._fetchActivitiesLocal()
    return !!localActivities.length
  }

  // Refactored
  async syncFromServer() {
    const store = await getStore()
    const { settings } = store.getState()
    const { syncActivitiesWithServerEnabled } = settings

    if (syncActivitiesWithServerEnabled) {
      const syncedActivities = await this._fetchActivitiesFormServer()
      if (syncedActivities && syncedActivities.length) {
        const localActivities = await this._fetchActivitiesLocal()
        const activitiesToRecover = filterObjectArraysByMatchingKeyValues(syncedActivities, localActivities, ['id'])
        const account = await this.getAccount()

        if (!account) {
          return
        }

        activitiesToRecover.map(async (activityToRecover: any) => {
          const decryptedPayload = await account.decryptData(activityToRecover.payloadEncrypted)
          const activityWithDecryptedPayload = {
            id: activityToRecover.id,
            accountKey: activityToRecover.accountKey,
            payload: JSON.parse(decryptedPayload),
          }
          await this._appendActivityToDB(activityWithDecryptedPayload)
        })

        await this.updateAccountActivities()
      }
    }
  }

  // Refactored
  async syncToServer() {
    const store = await getStore()
    const { settings } = store.getState()
    const { syncActivitiesWithServerEnabled } = settings

    if (syncActivitiesWithServerEnabled) {
      const syncedActivities = await this._fetchActivitiesFormServer()
      const localActivities = await this._fetchActivitiesLocal()
      const unsyncedActivities = filterObjectArraysByMatchingKeyValues(localActivities, syncedActivities, ['id'])
      unsyncedActivities.map(async (activity: IActivity) => {
        await this._syncActivityToServer(activity)
      })
    }
  }

  // Refactored
  async getAccount() {
    if (!this.account) this.account = await Account.find(this.accountIndex)
    return this.account
  }

  // Refactored
  async _fetchActivitiesFormServer(): Promise<Array<IActivity>> {
    const account = await this.getAccount()
    if (!account) {
      return []
    }
    const accountPubKey = await account.getAccountPubKey()
    const response = await getActivitiesApi(accountPubKey)
    if (response.status !== 200) {
      throw new Error('Failed to fetch activity!')
    }

    return response.body
  }

  // Refactored
  async _fetchActivitiesLocal(): Promise<Array<IActivity>> {
    const store = await getStore()
    const { accountActivities: activities } = store.getState()

    return activities
  }

  // Refactored
  async _appendActivityToDB(activity: IActivity) {
    const activitiesDB = new ActivitiesDB()
    return await activitiesDB.appendActivity(activity)
  }

  // Refactored
  async updateAccountActivities() {
    const store = await getStore()
    const account = await this.getAccount()
    if (!account) {
      return
    }
    const accountPubKey = await account.getAccountPubKey()

    const activitiesDB = new ActivitiesDB()
    const accountActivities = await activitiesDB.getAccountActivities(accountPubKey)

    await store.dispatch(setActivities(accountActivities))
    await waitForSync()
  }

  // Refactored
  async _syncActivityToServer(activity: IActivity) {
    const account = await this.getAccount()
    if (!account) {
      return
    }
    const payloadEncrypted = await account.encryptData(JSON.stringify(activity.payload))

    const requestBody = JSON.stringify({
      id: activity.id,
      accountKey: await account.getAccountPubKey(),
      payloadEncrypted,
    })

    const authHeaders = await account.authHeaders(requestBody)

    const response = await sendActivityApi(requestBody, authHeaders)
    if (response.status !== 201) {
      throw new Error('Failed to fetch activity!')
    }
    return response.body
  }

  async _syncActivitiesWithServerEnabled() {
    const store = await getStore()
    const { settings } = store.getState()
    return settings.syncActivitiesWithServerEnabled
  }
}

export default AccountActivities
