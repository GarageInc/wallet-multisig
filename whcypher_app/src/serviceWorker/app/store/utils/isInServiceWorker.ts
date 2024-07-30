export const isInServiceWorker = globalThis.constructor?.name.indexOf('ServiceWorker') >= 0
