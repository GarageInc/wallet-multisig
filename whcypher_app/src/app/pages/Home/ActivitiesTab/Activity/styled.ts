import { IconButton, Link } from '@material-ui/core'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { FlexRow } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import Small from 'src/app/componentElements/Typography/Body/Small'
import Copy from 'src/app/components/Copy/Copy'
import styled from 'styled-components'

export const SWrapper = styled.div`
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
`

export const SBodyText = styled.div`
  margin-bottom: 14px;
  width: 80%;
  font-size: 15px;
`

export const SField = styled.div`
  text-align: left;
  width: 50%;
`

export const SFieldWithIcon = styled(FlexRow)`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const SLabel = styled(Medium)`
  font-size: 15px;
  font-weight: 400;
`

export const SInline = styled(FlexRow)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const SCopy = styled(Copy)`
  padding: 5px !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 !important;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 50%;
  }
`

export const SItem = styled.div`
  position: relative;
  text-align: left;
  padding-top: 0;
  padding-bottom: 30px;
  cursor: pointer;
`

export const SAvatar = styled.img`
  width: 35px;
`

export const SParticipants = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const SError = styled(Small)`
  color: ${COLORS.palette.red};
  font-size: 12px;
  margin-top: -5px;
`

export const SIconButton = styled(IconButton)`
  padding: 0px !important;
`

export const SValueText = styled(Medium)`
  font-size: 14px;
`

export const SLink = styled(Link)`
  padding: 0px !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 !important;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 50%;
  }
`

export const PlainLink = styled(Link)`
  text-decoration: underline;
  font-size: 14px;
`

export const SOpenInNewIcon = styled(OpenInNewIcon)`
  font-size: 16px;
  color: ${COLORS.palette.blue};
`

export const SOpenInBrowserIcon = styled(OpenInBrowserIcon)`
  font-size: 16px;
  color: ${COLORS.palette.blue};
`
