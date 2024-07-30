import { Link } from '@material-ui/core'
import ImageSearchIcon from '@material-ui/icons/ImageSearch'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { FlexBox, FlexRow, Typography } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import styled from 'styled-components'

export const SOpenInNewIcon = styled(OpenInNewIcon)`
  width: 16px;
  height: 16px;
  color: ${COLORS.palette.darkGrey};
  margin-left: 4px;
  margin-bottom: -2px;
`

export const SImageSearchIcon = styled(ImageSearchIcon)`
  width: 16px;
  height: 16px;
  color: ${COLORS.palette.darkGrey};
  margin-left: 4px;
  margin-bottom: -2px;
`

export const SContainer = styled(FlexBox)`
  flex: 1;
`

export const SContent = styled(FlexBox)`
  padding: 16px 20px;
  flex: 1;
  max-height: 366px;
  overflow-y: auto;
`

export const SCard = styled.div`
  display: flex;
  padding: 10px 16px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px;
  background: ${COLORS.palette.lightBlue};
`

export const SLabelLink = styled(Link)`
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: initial;
  margin-left: 4px;
  display: flex;
  align-items: center;
`
export const STokenType = styled(Medium)`
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 4px;
`

export const SName = styled(Typography)`
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  color: ${COLORS.palette.dark};
  display: flex;
  align-items: center;
`

export const SSubName = styled(Medium)`
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  color: ${COLORS.palette.darkGrey};
  display: flex;
  align-items: center;
`

export const SLine = styled(FlexRow)`
  justify-content: flex-end;
  cursor: pointer;
  align-items: center;
  width: 100%;
  margin-bottom: 6px;
`

export const SRow = styled(FlexRow)`
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`

export const SAsset = styled(FlexBox)`
  margin-bottom: 8px;
  width: 100%;
`

export const SLineTokens = styled(SLine)`
  justify-content: space-between;
  margin-top: 17px;
`

export const SCenter = styled(Medium)`
  width: 100%;
  text-align: center;
`
