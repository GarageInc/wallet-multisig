import { IActivityData } from '../app/store/reducers/accountActivitiesReducer'
import LocalStorage from './localStorage'

/**
 * A secret vault
 * @class
 */
class ActivitiesDB {
  storage: LocalStorage
  activities: IActivityData[]

  constructor() {
    this.storage = new LocalStorage()
    this.activities = []
  }

  // Refactored
  async appendActivity(activityData: IActivityData) {
    await this._loadActivities()

    this.activities.push(activityData)
    await this.storage.setItem('activities', JSON.stringify(this.activities))
    return this.activities
  }

  // Refactored
  async getAccountActivities(accountKey: string) {
    await this._loadActivities()
    return this.activities.filter((activity) => activity.accountKey == accountKey)
  }

  // Refactored
  async removeActivitiesByPubKey(accountKey: string) {
    await this._loadActivities()

    this.activities = this.activities.filter((activity) => activity.accountKey !== accountKey)
    await this.storage.setItem('activities', JSON.stringify(this.activities))
    return this.activities
  }

  // Refactored
  async _loadActivities() {
    const activitiesInStorageJSON = await this.storage.getItem('activities')
    if (activitiesInStorageJSON) {
      this.activities = JSON.parse(activitiesInStorageJSON)
    }
  }
}

export default ActivitiesDB
