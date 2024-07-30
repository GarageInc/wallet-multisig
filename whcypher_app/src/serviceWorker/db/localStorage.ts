import Browser from 'webextension-polyfill'

export default class LocalStorage {
  setItem(key: string, value: any) {
    return new Promise((resolve, reject) => {
      const obj: any = {}
      obj[key] = value
      Browser.storage.local.set(obj).then(resolve).catch(reject)
    })
  }

  getItem(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      Browser.storage.local
        .get([key])
        .then((result) => {
          return resolve(result ? result[key] : null)
        })
        .catch(reject)
    })
  }

  removeItem(key: string) {
    Browser.storage.local.remove([key])
  }
}
