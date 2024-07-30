import { decrypt, EthEncryptedData } from 'eth-sig-util'
import logger from 'src/app/helpers/appLogger'
import { extractDecryptEIP1024Params } from 'src/app/helpers/crypto'
import { IMessage } from 'src/shared/interfaces/interfaces'

import { getPrivateKey } from './getPrivateKey'

export const decryptMessage = async (dappMessage: IMessage) => {
  logger.debug({ method: 'decrypt', dappMessage })

  try {
    const pkValue = await getPrivateKey()

    if (!pkValue) {
      throw Error('No private key')
    }

    const dataInput = dappMessage.raw.params.params[0]
    const json: EthEncryptedData = extractDecryptEIP1024Params(dataInput)

    const decryptedMsg: string = decrypt(json, pkValue)

    logger.debug({ msg: 'decrypt', decryptedMsg })
    return decryptedMsg
  } catch (e) {
    logger.error({
      method: 'decrypt: not handled',
      error: e,
    })
    return ''
  }
}
