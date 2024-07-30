import { getEncryptionPublicKey } from 'eth-sig-util'
import logger from 'src/app/helpers/appLogger'
import { IMessage } from 'src/shared/interfaces/interfaces'

import { getPrivateKey } from './getPrivateKey'

export const getCurrentAccountEncryptionPublicKey = async (dappMessage: IMessage) => {
  logger.debug({ method: 'getEncryptionPublicKey', dappMessage })

  try {
    const pkValue = await getPrivateKey()

    if (!pkValue) {
      throw Error('No private key')
    }

    const pubKey = getEncryptionPublicKey(pkValue)

    logger.debug({ msg: 'getEncryptionPublicKey', pubKey })
    return pubKey
  } catch (e) {
    logger.error({
      method: 'getEncryptionPublicKey: not handled',
      error: e,
    })
    return ''
  }
}
