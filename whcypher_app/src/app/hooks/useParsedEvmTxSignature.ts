import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import logger from 'src/app/helpers/appLogger'
import { ABISignature, EthereumChain } from 'src/serviceWorker/app/models/EthereumChain'
import { ITx } from 'src/serviceWorker/app/types/interfaces'

export interface IResSigInfo {
  params: ethers.utils.Result
  type: string
}

// Receives tx signature data and parse it via using API endpoint
export const useParsedEvmTxSignature = (params: any, txData: ITx) => {
  const [sigInfo, setSigInfo] = useState<IResSigInfo>()

  const [signature, setSignature] = useState<ABISignature>({
    textSignature: '',
  })

  useEffect(() => {
    const checkingSignature = params?.data?.slice(0, 10)
    if (checkingSignature) {
      EthereumChain.getSignatures(checkingSignature)
        .then((sigs: any) => {
          const resultSig = sigs.results?.[0]

          if (resultSig.hex_signature === checkingSignature) {
            setSignature({
              textSignature: resultSig.text_signature,
            })
          }
        })
        .catch((err: Error) => {
          logger.error({ transactionMsg: `getSignatures error`, err })
        })
    }
  }, [params, txData])

  useEffect(() => {
    setSigInfo(EthereumChain.decryptParams(signature, params))
  }, [signature, params])

  return { sigInfo }
}
