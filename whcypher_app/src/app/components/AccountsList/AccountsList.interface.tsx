import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

export interface IAccountsList {
  onChange: (val: Array<string>, walletId: string) => void
  chainId: BlockchainNames
  selectedWalletIds: Array<string>
  className?: string
  showHeader?: boolean
  dappActiveWalletId?: string
}
