import LocalStorage from './localStorage'

export interface IHandler {
  handlerName: string
  lockFor?: number
}

/**
 * A secret vault
 * @class
 */
class HandlersDB {
  storage: LocalStorage
  handlers: { [key: string]: number }
  constructor() {
    this.storage = new LocalStorage()
    this.handlers = {}
  }

  // Refactored
  async addHandler(payload: IHandler) {
    await this.getHandlers()

    if (payload.lockFor) {
      this.handlers[payload.handlerName] = Date.now() + payload.lockFor - 1000 // minus tolerance due to artificial delays
      await this.storage.setItem('handlers', JSON.stringify(this.handlers))
    }

    return this.handlers
  }

  // Refactored
  async removeHandler(payload: IHandler) {
    await this.getHandlers()

    delete this.handlers[payload.handlerName]
    await this.storage.setItem('handlers', JSON.stringify(this.handlers))
    return this.handlers
  }

  // Refactored
  async clearHandlers() {
    await this.getHandlers()

    this.handlers = {}
    await this.storage.setItem('handlers', JSON.stringify(this.handlers))
    return this.handlers
  }

  // Refactored
  async getHandlers() {
    const handlersInStorageJSON = await this.storage.getItem('handlers')
    if (handlersInStorageJSON) {
      this.handlers = JSON.parse(handlersInStorageJSON)
    }

    return this.handlers
  }
}

export default HandlersDB
