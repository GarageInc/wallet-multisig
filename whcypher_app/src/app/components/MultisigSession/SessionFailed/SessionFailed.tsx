import React from 'react'
import { FlexBox, PrimaryButton } from 'src/app/componentElements'

import ContentWrapper from '../../ContentWrapper/ContentWrapper'
import { SActionText, SBtnIcon, SCancelIcon, SContainer, SText } from './styled'

interface IProps {
  goBack: () => void
}

const SessionFailed = ({ goBack }: IProps) => {
  return (
    <ContentWrapper>
      <SContainer>
        <SText>Wallet generation failed</SText>

        <SCancelIcon />

        <FlexBox marginTop="auto">
          <SActionText>Go back to try again:</SActionText>

          <PrimaryButton marginTop="16px" onClick={goBack} startIcon={<SBtnIcon />}>
            Return to main screen
          </PrimaryButton>
        </FlexBox>
      </SContainer>
    </ContentWrapper>
  )
}

export default SessionFailed
