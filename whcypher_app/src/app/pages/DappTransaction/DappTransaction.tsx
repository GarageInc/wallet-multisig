import { BlockchainNames, ofEthereumFamily } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { useMemo } from 'react'
import { useDappMsgChecker, useNoMessagesChecker } from 'src/app/hooks/useDappMsgChecker'
import { IMessage } from 'src/shared/interfaces/interfaces'

import DAppTransactionEVM from './Chains/EVM'

const DAppTransaction = () => {
  useDappMsgChecker()

  const { dappMessage: transactionMsg } = useNoMessagesChecker()

  const chainId = useMemo(() => transactionMsg?.chainId, [transactionMsg])

  return <Body transactionMsg={transactionMsg} chainId={chainId} />
}

const Body = ({ chainId, transactionMsg }: { chainId: BlockchainNames; transactionMsg: IMessage }) => {
  switch (chainId) {
    default:
      if (ofEthereumFamily(chainId)) {
        return <DAppTransactionEVM transactionMsg={transactionMsg} />
      }
      return null
  }
}

export default DAppTransaction
