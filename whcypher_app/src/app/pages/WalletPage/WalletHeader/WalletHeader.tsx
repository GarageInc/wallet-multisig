import { Tooltip } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { COLORS } from 'src/app/componentElements/Colors'
import { WalletIcon } from 'src/app/componentElements/icons'
import H2 from 'src/app/componentElements/Typography/Headings/H2'

import Icon from '../../../componentElements/Icon/Icon'
import Copy from '../../../components/Copy/Copy'
import PageHeader from '../../../components/PageHeader/PageHeader'
import QRModal from '../../../components/QRModal/QRModal'
import { WALLET_PARTICIPANTS_PATH } from '../../../constants/paths'
import { updateWalletName } from '../../../helpers/backgroundMethods'
import { formatAddress, formatName } from '../../../helpers/formatters'
import { addressURL } from '../../../helpers/links'
import {
  SAddress,
  SCheckIcon,
  SContainer,
  SIconButton,
  SLink,
  SNameEditIcon,
  SOpenInNewIcon,
  SParticipants,
  SRow,
  SRowHeader,
  STextField,
  SWalletInfo,
} from './styleds'
import { WalletButtons } from './WalletButtons'

const WalletHeader = ({ walletData }: { walletData: any }) => {
  const history = useHistory()

  const { walletId } = walletData
  const walletName = walletData.name
  const walletAddress = walletData.calculatedAddress
  const [visibleWalletName, setVisibleWalletName] = useState(walletName)
  const [isWalletNameEdited, setIsWalletNameEdited] = useState(false)
  const [qrModalOpen, setQRModalOpen] = React.useState(false)

  const onUpdateWalletName = useCallback(() => {
    updateWalletName(walletId, visibleWalletName, () => {
      setIsWalletNameEdited(false)
    })
  }, [walletId, visibleWalletName])

  const onClickParticipantsIcon = useCallback(() => {
    history.push({
      pathname: WALLET_PARTICIPANTS_PATH,
      state: { walletId: walletData.walletId },
    })
  }, [history, walletData?.walletId])

  return (
    <SContainer>
      <SRowHeader>
        <PageHeader goBack={() => history.goBack()} />
        {!isWalletNameEdited ? (
          <SRow>
            <H2>{formatName(walletName, 14)}</H2>
            <SIconButton onClick={() => setIsWalletNameEdited(true)}>
              <SNameEditIcon />
            </SIconButton>
          </SRow>
        ) : (
          <SRow>
            <STextField
              value={visibleWalletName}
              onChange={(e) => setVisibleWalletName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onUpdateWalletName()
                }
              }}
            />

            <SIconButton onClick={() => onUpdateWalletName()}>
              <SCheckIcon />
            </SIconButton>
          </SRow>
        )}
        <Tooltip arrow placement="bottom" title="Wallet information">
          <SIconButton onClick={() => onClickParticipantsIcon()}>
            <SWalletInfo>
              <WalletIcon />
              <SParticipants>
                {walletData.minimumSigAmount}
                -of-
                {walletData.partiesAmount}
              </SParticipants>
            </SWalletInfo>
          </SIconButton>
        </Tooltip>
      </SRowHeader>

      {walletAddress && (
        <SRow marginTop="2px">
          <SAddress>{formatAddress(walletAddress, 4)}</SAddress>

          <Copy iconStyle={{ color: COLORS.palette.darkGrey }} text={walletAddress} toolTip="Copy wallet address" />

          <Tooltip arrow placement="bottom" title="Show address as QR code">
            <SIconButton onClick={() => setQRModalOpen(true)}>
              <Icon icon="qrcode" size={12} color={COLORS.palette.darkGrey} />
            </SIconButton>
          </Tooltip>

          <Tooltip arrow placement="bottom" title="Open in explorer">
            <SLink target="_blank" href={addressURL(walletData.blockchain, walletAddress)}>
              <SOpenInNewIcon />
            </SLink>
          </Tooltip>
        </SRow>
      )}

      {walletId && <WalletButtons walletDataWithRequests={walletData} walletId={walletId} />}

      <QRModal
        code={walletAddress}
        open={qrModalOpen}
        handleClose={() => setQRModalOpen(false)}
        title="Wallet Address"
      />
    </SContainer>
  )
}

export default WalletHeader
