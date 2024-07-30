import { Button, LinearProgress } from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { FlexBox } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import { RoundClose } from 'src/app/componentElements/icons'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import Small from 'src/app/componentElements/Typography/Body/Small'
import styled from 'styled-components'

import Icon from '../../../componentElements/Icon/Icon'

export const SSessionInfo = styled(FlexBox)`
  background-color: ${COLORS.palette.lightBlue};
  border-radius: 4px;
  margin-bottom: 5px;
  color: #000;
  padding: 16px 20px;
`

export const SButton = styled(Button)`
  display: flex;
  align-items: center;
  color: ${COLORS.palette.blue} !important;
  cursor: pointer;
`

export const SAwaitingAmount = styled.span`
  color: ${COLORS.palette.blue};
  font-size: 24px;
  font-weight: 600;
`

export const SFileCopyIcon = styled(FileCopyIcon)`
  margin-right: 5px;
  color: ${COLORS.palette.blue};
  width: 16px;
  height: 16px;
`

export const SLinearProgress = styled(LinearProgress)`
  width: 250px;
  height: 20px;
  border-radius: 7px;
  margin: 0 auto;
`

export const SSessionText = styled(Medium)`
  font-size: 16px;
  margin-bottom: 16px;
`

export const SStatus = styled(FlexBox)`
  margin-top: 24px;
`

export const SBtnLabel = styled.span`
  color: ${COLORS.palette.blue};
`

export const SBold = styled(Medium)`
  font-size: 16px;
  font-weight: 500;
  display: inline-block;
`

export const SCountDown = styled(Small)`
  font-size: 12px;
  font-weight: 300;
  color: ${COLORS.palette.darkGrey};
  margin-top: 8px;
`

export const SIcon = styled(Icon)`
  margin-right: 5px;
  color: ${COLORS.palette.blue};
`

export const SRoundClose = styled(RoundClose)`
  margin-left: 4px;
`

export const SRequest = styled(Small)`
  color: ${COLORS.palette.darkGrey};
`

export const SCancel = styled.a`
  font-weight: 500;
  margin-top: 3px;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: ${COLORS.palette.darkGrey};
`

export const SParticipantsWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  align-content: center;
`

export const SParticipant = styled.div`
  position: relative;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 135px;
`

export const SAvatar = styled.img`
  width: 32px;
  margin-right: 8px;
`
