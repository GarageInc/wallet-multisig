import React from 'react'
import { FlexBox, PrimaryButton } from 'src/app/componentElements'
import { IWalletRequest } from 'src/serviceWorker/app/store/reducers/walletRequestsReducer'

import { SActionText, SBtnIcon, SCancelIcon, SContainer, SText } from './styled'

const GroupTransactionUnsupported = ({
  walletRequest,
  goBack,
  singleRequest,
}: {
  walletRequest: IWalletRequest
  goBack: (w: IWalletRequest) => void
  singleRequest: boolean
}) => (
  <SContainer>
    <SText>This transaction type is unsupported</SText>

    <SCancelIcon />

    <FlexBox marginTop="auto">
      <SActionText>Please update TotalSig and try again</SActionText>

      {singleRequest ? (
        <PrimaryButton onClick={() => goBack(walletRequest)} startIcon={<SBtnIcon />} fullWidth>
          Home
        </PrimaryButton>
      ) : (
        <PrimaryButton onClick={() => goBack(walletRequest)} fullWidth>
          OK
        </PrimaryButton>
      )}
    </FlexBox>
  </SContainer>
)

export default GroupTransactionUnsupported
