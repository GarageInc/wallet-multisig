import React from 'react'
import { FlexBox, PrimaryButton } from 'src/app/componentElements'
import { IWalletRequest } from 'src/serviceWorker/app/store/reducers/walletRequestsReducer'

import { SActionText, SBtnIcon, SCancelIcon, SContainer, SText } from './styled'

const GroupTransactionFailed = ({
  walletRequest,
  goBack,
  singleRequest,
}: {
  walletRequest: IWalletRequest
  goBack: (w: IWalletRequest) => void
  singleRequest: boolean
}) => (
  <SContainer>
    <SText>This session was unsuccessful</SText>

    <SCancelIcon />

    <FlexBox marginTop="auto">
      <SActionText>Go back to initiate a new signature!</SActionText>

      {singleRequest ? (
        <PrimaryButton marginTop="16px" onClick={() => goBack(walletRequest)} startIcon={<SBtnIcon />} fullWidth>
          Home
        </PrimaryButton>
      ) : (
        <PrimaryButton marginTop="16px" onClick={() => goBack(walletRequest)} fullWidth>
          OK
        </PrimaryButton>
      )}
    </FlexBox>
  </SContainer>
)

export default GroupTransactionFailed
