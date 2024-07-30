import _elliptic from 'elliptic'
import HDKey from 'hdkey'
import _jsSha from 'js-sha256'

import * as _ecies from './utils/ecies'

const EC = _elliptic.ec

class Key {
  hdWallet: any
  _path: string

  constructor(seedHex: string, path: string) {
    this.hdWallet = HDKey.fromMasterSeed(seedHex)
    this._path = path
  }

  async encrypt(values: any[], encoding = 'hex') {
    return await _ecies.encrypt(values, this, encoding)
  }

  async decrypt(enc_values: any[], encoding = 'hex') {
    return await _ecies.decrypt(enc_values, this, encoding)
  }

  get privKey() {
    const key = this.hdWallet.derive(this._path)
    return key.privateKey.toString('hex')
  }

  get pubKey() {
    const key = this.hdWallet.derive(this._path)
    return key.publicKey.toString('hex')
  }

  get path() {
    return this._path
  }

  toJSON() {
    return {
      privKey: this.privKey,
      pubKey: this.pubKey,
    }
  }

  sign(data: any, bufferize = false) {
    const hash = _jsSha.sha256.create()
    hash.update(data)

    // TODO We calculate signature somewhere for buffer and somewhere for raw hex. Should fix it
    // Place where we calculate signature for raw hex hosted servers
    if (bufferize) {
      return this.sign_raw(Buffer.from(hash.toString(), 'utf-8'))
    } else {
      return this.sign_raw(hash.toString())
    }
  }

  sign_raw(hash: Buffer | string) {
    const ec = new EC('secp256k1')
    const pKey = ec.keyFromPrivate(this.privKey, 'hex')

    const signature = pKey.sign(hash)
    return signature.toDER('hex')
  }
}

export default Key
