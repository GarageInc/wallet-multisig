import KnownHost from '../models/KnownHost'

class KnownHostsController {
  async addHost(host: string) {
    await KnownHost.addToActiveAccount(host)
  }

  async deleteHost(host: string) {
    await KnownHost.deleteFromActiveAccount(host)
  }
}

export default KnownHostsController
