import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { FC, useCallback } from 'react'
import PopupContainer from 'src/app/components/PopupContainer/PopupContainer'
import { useConnectedAccountsApproving } from 'src/app/hooks/useConnectedAccountsApproving'
import { IMessage } from 'src/shared/interfaces/interfaces'

import AccountsList from '../AccountsList/AccountsList'
import Footer from '../Footer/Footer'
import { DappApproveHeader } from '../Header/headers/DappApproveHeader'
import { DappConnectHeader } from '../Header/headers/DappConnectHeader'
import InfoContent from '../InfoContent/InfoContent'

interface IDAppConnected {
  message: IMessage
  onClose: () => Promise<void>
  onConfirm: (val: Array<string>) => Promise<void>
}

interface IBody {
  hasUserSelectedAccounts: boolean
  chainId: BlockchainNames
  handleAccountsChange: (val: Array<string>) => void
  selectedWalletIds: Array<string>
  className?: string
}

export const AccountsListBody: FC<IBody> = ({
  hasUserSelectedAccounts,
  chainId,
  handleAccountsChange,
  selectedWalletIds,
  className,
}) => {
  if (hasUserSelectedAccounts) {
    return <InfoContent />
  } else {
    return (
      <AccountsList
        className={className}
        chainId={chainId}
        onChange={handleAccountsChange}
        selectedWalletIds={selectedWalletIds}
      />
    )
  }
}

const DAppConnected: FC<IDAppConnected> = ({ onConfirm, onClose, message }) => {
  const {
    handleConfirm,
    hasUserSelectedAccounts,
    chainId,
    selectedWallets,
    setSelectedWallets,
    setHasUserSelectedAccounts,
  } = useConnectedAccountsApproving(message, onConfirm)

  const handleClose = useCallback(async () => {
    await onClose()
    if (message) {
      setHasUserSelectedAccounts(false)
    }
  }, [message, onClose, setHasUserSelectedAccounts])

  return (
    <PopupContainer
      header={
        hasUserSelectedAccounts ? (
          <DappApproveHeader
            message={message}
            selectedWallets={selectedWallets}
            goBack={() => {
              setHasUserSelectedAccounts(false)
            }}
          />
        ) : (
          <DappConnectHeader message={message} />
        )
      }
      body={
        <AccountsListBody
          hasUserSelectedAccounts={hasUserSelectedAccounts}
          chainId={chainId}
          handleAccountsChange={setSelectedWallets}
          selectedWalletIds={selectedWallets}
        />
      }
      footer={
        <Footer
          onCancel={handleClose}
          onSubmit={handleConfirm}
          disabledSubmit={selectedWallets.length === 0}
          submitLabel={hasUserSelectedAccounts ? 'Connect' : 'Next'}
        />
      }
    />
  )
}

export default DAppConnected
