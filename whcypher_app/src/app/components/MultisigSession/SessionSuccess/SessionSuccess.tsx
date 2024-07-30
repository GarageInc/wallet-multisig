import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import { FlexBox, FlexRow, PrimaryButton, SecondaryButton } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import { walletSessionToId } from 'src/app/helpers/wallet'
import { IPreviewSession } from 'src/app/pages/RequestPermission/components/RequestJoinMultisigSession'

import { WALLET_PAGE_PATH } from '../../../constants/paths'
import { removeRequest } from '../../../helpers/backgroundMethods'
import { formatAddress } from '../../../helpers/formatters'
import ContentWrapper from '../../ContentWrapper/ContentWrapper'
import Copy from '../../Copy/Copy'
import { SActionText, SBtnIcon, SContainer, SIcon, SText } from './styled'

interface IProps {
  goBack: () => void
  session: IPreviewSession
  sessionId: string
}

const SessionSuccess = ({ sessionId, session, goBack }: IProps) => {
  const history = useHistory()

  const openWalletPage = useCallback(() => {
    removeRequest({ sessionId }, () => {
      const walletId = walletSessionToId(session)
      history.push({
        pathname: WALLET_PAGE_PATH,
        search: `?walletId=${walletId}`,
      })
    })
  }, [history, session, sessionId])

  return (
    <ContentWrapper>
      <SContainer>
        <SText>Your {session.blockchain} wallet is ready!</SText>

        <SIcon icon="circle-check" />

        <FlexBox marginTop="auto">
          <FlexRow alignItems="center" justifyContent="center" gridGap="4px">
            <SActionText>{formatAddress(session.address)}</SActionText>
            {session.address && <Copy text={session.address} iconStyle={{ color: COLORS.palette.blue }} />}
          </FlexRow>

          <FlexRow gridGap="16px" marginTop="16px">
            <SecondaryButton onClick={goBack} startIcon={<SBtnIcon />} fullWidth>
              Back
            </SecondaryButton>
            <PrimaryButton fullWidth onClick={() => openWalletPage()}>
              Open wallet
            </PrimaryButton>
          </FlexRow>
        </FlexBox>
      </SContainer>
    </ContentWrapper>
  )
}

export default SessionSuccess
