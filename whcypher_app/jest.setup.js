Object.assign(global, require('jest-chrome'))

const fakeLocalStorage = require('./test/helpers/fakeLocalStorage').default

global.chrome.storage.local = {
  get(key, cb) {
    const item = JSON.parse(fakeLocalStorage.getItem(key))
    cb({ [key]: item })
  },
  set(obj, cb) {
    const key = Object.keys(obj)[0]
    fakeLocalStorage.setItem(key, JSON.stringify(obj[key]))
    cb()
  },
  remove(keys) {
    const key = keys[0]
    fakeLocalStorage.removeItem(key)
  },
}

global.chrome.action = {
  setBadgeText(params) {},
}

const { randomFillSync } = require('crypto')

Object.defineProperty(globalThis, 'crypto', {
  value: { getRandomValues: randomFillSync },
})
