import { Link } from '@material-ui/core'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import React from 'react'
import { FlexRow, PrimaryButton } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import { SignMessageView } from 'src/app/components/SignMessageView/SignMessageView'
import { EthereumChain } from 'src/serviceWorker/app/models/EthereumChain'
import { IWalletRequest } from 'src/serviceWorker/app/store/reducers/walletRequestsReducer'

import Copy from '../../../components/Copy/Copy'
import { formatAddress } from '../../../helpers/formatters'
import { transactionURL } from '../../../helpers/links'
import styles from './GroupTransactionReady.module.scss'
import { SActionText, SBtnIcon, SContainer, SIcon, SText } from './styled'

const GroupTransactionReady = ({
  walletRequest,
  goBack,
  singleRequest,
}: {
  walletRequest: IWalletRequest
  goBack: (w: IWalletRequest) => void
  singleRequest: boolean
}) => (
  <SContainer>
    {walletRequest.rawData && EthereumChain.isSignMessage(walletRequest.rawData) ? (
      <>
        <SText>Message has been signed</SText>

        <SIcon icon="circle-check" />

        <SignMessageView signInMsg={walletRequest.rawData} />
      </>
    ) : (
      <>
        <SText>Transaction has been sent</SText>

        <SIcon icon="circle-check" />

        <FlexRow marginTop="auto">
          <SActionText>{formatAddress(walletRequest.transactionId, 10)}</SActionText>
          <Copy
            text={walletRequest.transactionId}
            className={styles.iconButton}
            iconStyle={{ color: COLORS.palette.blue }}
          />
          <Link
            classes={{ root: styles.iconButton }}
            target="_blank"
            href={transactionURL(walletRequest.blockchain, walletRequest.transactionId)}
          >
            <OpenInNewIcon classes={{ root: styles.icon }} />
          </Link>
        </FlexRow>
      </>
    )}

    {singleRequest ? (
      <PrimaryButton onClick={() => goBack(walletRequest)} startIcon={<SBtnIcon />} fullWidth>
        Home
      </PrimaryButton>
    ) : (
      <PrimaryButton onClick={() => goBack(walletRequest)} fullWidth>
        OK
      </PrimaryButton>
    )}
  </SContainer>
)

export default GroupTransactionReady
