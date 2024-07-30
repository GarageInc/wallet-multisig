import { FC } from 'react'
import { useConnectedAccountsApproving } from 'src/app/hooks/useConnectedAccountsApproving'
import { IMessage } from 'src/shared/interfaces/interfaces'
import styled from 'styled-components'

import AccountsList from '../AccountsList/AccountsList'
import DappRequestedTemplate from '../DappRequestedTemplate/DappRequestedTemplate'
import { DappPermissionsHeader } from '../Header/headers/DappPermissionsHeader'

const AccountsListBodyStyled = styled(AccountsList)`
  .accounts-list {
    max-height: 271px;
  }
`

interface IDAppConnected {
  message: IMessage
  onConfirm: (val: Array<string>) => Promise<void>
}

const DappRequestPermissions: FC<IDAppConnected> = ({ onConfirm, message }) => {
  const { handleConfirm, chainId, selectedWallets, setSelectedWallets } = useConnectedAccountsApproving(
    message,
    onConfirm,
    true,
  )

  return (
    <DappRequestedTemplate
      onSubmit={handleConfirm}
      confirmLabel="Confirm"
      checkFromAddress={false}
      closeOnEnd={true}
      dappMessage={message}
      header={({ message }) => <DappPermissionsHeader message={message} />}
    >
      <AccountsListBodyStyled chainId={chainId} onChange={setSelectedWallets} selectedWalletIds={selectedWallets} />
    </DappRequestedTemplate>
  )
}

export default DappRequestPermissions
