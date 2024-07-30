import _cryptoJs from 'crypto-js'
import { ACCOUNT_MASTER_PATH } from 'src/shared/appConfigs'

import SeedsDB from '../../db/SeedsDB'
import { getStore } from '../store/store'
import Key from './Key'

const intToHex = (bigint: bigint) => {
  const base = 16
  const hex = bigint.toString(base).padStart(64, '0')
  return hex
}

class KeyManager {
  accountIndex: number
  seedDB: SeedsDB | null

  constructor(accountIndex: number) {
    this.accountIndex = accountIndex
    this.seedDB = null
  }

  // Refactored
  async accountSeed() {
    const seedDB = await this._getSeedDB()
    return await seedDB.getSeedForAccountByIndex(this.accountIndex)
  }

  // Refactored
  async getRootKey() {
    return new Key(await this.accountSeed(), 'm')
  }

  // Refactored
  async getMasterKey() {
    return new Key(await this.accountSeed(), ACCOUNT_MASTER_PATH)
  }
  // Refactored
  async getKeyByPath(path: string) {
    return new Key(await this.accountSeed(), path)
  }

  // Refactored
  async authHeaders(requestBody: string, path: string) {
    const seedHex = await this.accountSeed()

    const timestamp = +new Date()

    const partyPrivKey = new Key(seedHex, path)
    const partyPubKey = partyPrivKey.pubKey
    const bodyMessage = `${requestBody}${timestamp}`
    const bodySignature = partyPrivKey.sign(bodyMessage, false)

    const accountPrivKey = new Key(seedHex, ACCOUNT_MASTER_PATH)
    const accountPubKey = accountPrivKey.pubKey
    const partyPubKeyMessage = `${partyPubKey}${timestamp}`
    const partyPubKeySignature = accountPrivKey.sign(partyPubKeyMessage)

    // if (log) {
    //   const ec = new EC('secp256k1');
    //   const pubKey_obj = ec.keyFromPublic(partyPubKey, 'hex');
    //   const msg_obj = Buffer.from(_jsSha.sha256(bodyMessage), "hex");
    //   const signatureVerify = pubKey_obj.verify(msg_obj, bodySignature);

    //   console.log('public_key', partyPubKey);
    //   console.log('message_raw', bodyMessage);
    //   console.log('message_to_sign', _jsSha.sha256(bodyMessage));
    //   console.log('signature', bodySignature);
    //   console.log('signature verify', signatureVerify);
    // }

    return {
      timestamp,
      partyPubKey,
      bodySignature,
      accountPubKey,
      partyPubKeySignature,
    }
  }

  // Refactored
  async encryptData(stringData: string, partyPath = null) {
    const path = partyPath ? partyPath : ACCOUNT_MASTER_PATH
    const seedHex = await this.accountSeed()
    const accountPrivKey = new Key(seedHex, path)

    return _cryptoJs.enc.Base64.stringify(
      _cryptoJs.enc.Utf8.parse(_cryptoJs.AES.encrypt(stringData, intToHex(accountPrivKey.privKey)).toString()),
    )
  }

  // Refactored
  async decryptData(encryptedStringData: string, partyPath = null) {
    const path = partyPath ? partyPath : ACCOUNT_MASTER_PATH
    const seedHex = await this.accountSeed()
    const accountPrivKey = new Key(seedHex, path)

    const encryptedStringDataSerialized = _cryptoJs.enc.Base64.parse(encryptedStringData).toString(_cryptoJs.enc.Utf8)
    return _cryptoJs.AES.decrypt(encryptedStringDataSerialized, accountPrivKey.privKey).toString(_cryptoJs.enc.Utf8)
  }

  // Refactored
  async setSeedDB(seedDB: SeedsDB) {
    this.seedDB = seedDB
  }

  // Refactored
  async _getSeedDB(): Promise<SeedsDB> {
    if (!this.seedDB) {
      const store = await getStore()
      const { application } = store.getState()
      this.seedDB = new SeedsDB(application.password)
    }

    return this.seedDB
  }
}

export default KeyManager
