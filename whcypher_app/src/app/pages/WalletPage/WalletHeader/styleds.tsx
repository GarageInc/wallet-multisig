import { IconButton, Link, TextField } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CreateIcon from '@material-ui/icons/Create'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { Badge, FlexBox, FlexRow, Typography } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const SContainer = styled.div`
  padding: 12px 20px;
  background: ${COLORS.palette.lightGrey};
`

export const SAddress = styled(Typography)`
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  color: ${COLORS.palette.darkGrey};
`

export const SLink = styled(Link)`
  height: 16px;
`

export const SOpenInNewIcon = styled(OpenInNewIcon)`
  width: 16px;
  color: ${COLORS.palette.darkGrey};
  height: initial;
`

export const SButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 11px auto auto;
  max-width: 172px;
`

export const SBtnLabel = styled(Typography)`
  margin-top: 4px;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;

  color: ${COLORS.palette.dark};
`

export const SRow = styled(FlexRow)`
  gap: 8px;
  align-items: center;
  justify-content: center;
`

export const SRowHeader = styled(SRow)`
  width: 100%;
  justify-content: space-between;
`

export const SWalletInfo = styled(FlexBox)`
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`

export const SParticipants = styled.div`
  margin-top: 3px;
  color: ${COLORS.palette.blue};
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
`

export const SIconButton = styled(IconButton)`
  flex-direction: column;
  padding: 0px;
`

export const SNameEditIcon = styled(CreateIcon)`
  color: ${COLORS.palette.darkGrey};
  width: 16px;
  height: 16px;

  &:hover {
    cursor: pointer;
    color: ${COLORS.palette.blue};
  }
`

export const SCheckIcon = styled(CheckIcon)`
  color: ${COLORS.palette.darkGrey};
  width: 16px;
`

export const STextField = styled(TextField)`
  max-width: 180px;

  .MuiInput-root {
    background: none;
    border: none !important;

    &:hover {
      border: none !important;
    }
  }

  input {
    color: ${COLORS.palette.dark};
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    background: none;
    padding: 0px;
    border-right: none !important;
    border-left: none !important;
    border-top: none !important;
    border-bottom: 1px solid ${COLORS.palette.dark};
    margin-bottom: -1px;
    border-radius: 0px;

    &:hover {
      border-right: none !important;
      border-left: none !important;
      border-top: none !important;
      border-bottom: 1px solid ${COLORS.palette.dark};
    }
  }
`

export const RequestsAmountBadge = styled(Badge)`
  color: ${COLORS.palette.white};
  background-color: ${COLORS.palette.yellow};
  border-radius: 20px;
  display: flex;
  width: 32px;
  height: 32px;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`
