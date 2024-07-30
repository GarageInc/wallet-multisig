import { Box, Button } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import pluralize from 'pluralize'
import React, { useCallback } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSelector } from 'react-redux'
import { FlexBox, FlexRow } from 'src/app/componentElements'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import { AppState } from 'src/serviceWorker/app/store/store'

import { rejectMultisigSession } from '../../../helpers/backgroundMethods'
import { formatAddress } from '../../../helpers/formatters'
import { createAvatarSvg } from '../../../helpers/publicKeyImageCreator'
import ContentWrapper from '../../ContentWrapper/ContentWrapper'
import QRModal from '../../QRModal/QRModal'
import SecondsCountDown from '../../SecondsCountDown'
import {
  SAvatar,
  SAwaitingAmount,
  SBold,
  SBtnLabel,
  SCancel,
  SCountDown,
  SFileCopyIcon,
  SIcon,
  SLinearProgress,
  SParticipant,
  SParticipantsWrapper,
  SRequest,
  SRoundClose,
  SSessionInfo,
  SSessionText,
  SStatus,
} from './styled'

interface IProps {
  sessionId: string
  session: any
  onBack: () => void
}

const SessionInProgress = ({ sessionId, session, onBack }: IProps) => {
  const activeAccountPubkey = useSelector((state: AppState) => state.application.activeAccountData.pubKey)

  const [qrModalOpen, setQRModalOpen] = React.useState(false)

  const onCancelClicked = useCallback(() => {
    rejectMultisigSession(sessionId)
  }, [sessionId])

  return (
    <ContentWrapper title={`New ${session.blockchain} wallet`} goBack={onBack}>
      <FlexBox>
        <Box mx={2}>
          <SSessionInfo>
            <Medium>Share this ID with others</Medium>
            <Medium fontSize={16} fontWeight={500} mt="8px">
              {sessionId}
            </Medium>
            <FlexRow marginTop="16px" alignItems="center" justifyContent="center" gridGap="24px">
              <CopyToClipboard text={sessionId}>
                <Button>
                  <SFileCopyIcon />
                  <SBtnLabel>Copy</SBtnLabel>
                </Button>
              </CopyToClipboard>
              <Button onClick={() => setQRModalOpen(true)}>
                <SIcon icon="qrcode" size={12} />
                <SBtnLabel>QR Code</SBtnLabel>
              </Button>
            </FlexRow>
          </SSessionInfo>

          <QRModal
            code={sessionId}
            open={qrModalOpen}
            handleClose={() => setQRModalOpen(false)}
            title="Join this wallet"
          />

          <SStatus>
            <SSessionText>
              <SBold>Keep your wallet online</SBold> {session.partiesAmount === session.joined && 'just a bit more...'}
              {session.partiesAmount > session.joined && (
                <>
                  until <SAwaitingAmount>{session.partiesAmount - session.joined}</SAwaitingAmount> more{' '}
                  {pluralize('participant', session.partiesAmount - session.joined)} will join.
                </>
              )}
            </SSessionText>

            <SLinearProgress color="primary" />

            <SCountDown>
              <SRequest>
                Request will expire in <SecondsCountDown expiresTimestamp={session.expiresAt} />
              </SRequest>
              <SCancel onClick={() => onCancelClicked()}>
                Cancel <SRoundClose />
              </SCancel>
            </SCountDown>
          </SStatus>

          <SParticipantsWrapper>
            {session.joinedParties.map((pubKey: any) => (
              <SParticipant key={pubKey}>
                <SAvatar alt="avatar" src={`data:image/svg+xml;utf8,${encodeURIComponent(createAvatarSvg(pubKey))}`} />
                <Medium fontSize={14}>{activeAccountPubkey === pubKey ? 'You' : formatAddress(pubKey, 6)}</Medium>
              </SParticipant>
            ))}

            {[...Array(session.partiesAmount - session.joined)].map((elem, index) => (
              <SParticipant key={index}>
                <Skeleton variant="circle" animation="wave" width={32} height={32} style={{ marginRight: 8 }} />
                <Skeleton variant="text" animation="wave" width={90} />
              </SParticipant>
            ))}
          </SParticipantsWrapper>
        </Box>
      </FlexBox>
    </ContentWrapper>
  )
}

export default SessionInProgress
