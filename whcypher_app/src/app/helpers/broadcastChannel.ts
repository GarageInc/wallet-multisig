// BroadcastChannel works same as sendMessage API, but it also allows to handle messages between/inside one service worker(s)
// For example: async sending message from 1 module to another module in 1 service worker
export const extensionBroadcast = new BroadcastChannel('totalsig-channel')

export const broadcaseMessage = async (type: string, message?: any) => {
  extensionBroadcast.postMessage({
    message,
    type,
  })
}
