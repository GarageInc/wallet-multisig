import { FlexBox, FlexRow, Link } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import { ContactIcon, CrossIcon } from 'src/app/componentElements/icons'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import ContentWrapper from 'src/app/components/ContentWrapper/ContentWrapper'
import styled from 'styled-components'

export const STitle = styled(Medium)`
  font-size: 20px;
  font-weight: 500;
`

export const SLink = styled(Link)`
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  color: ${COLORS.palette.blue};
  position: absolute;
  right: 0;
`

export const SContentWrapper = styled(ContentWrapper)`
  overflow-y: scroll;
  height: calc(100% - 90px);
`

export const SNextBlock = styled(FlexBox)`
  margin-top: 16px;
  position: relative;
`

export const SContactIcon = styled(ContactIcon)`
  position: absolute;
  top: 32px;
  right: 10px;
  cursor: pointer;
`

export const SCrossIcon = styled(CrossIcon)`
  position: absolute;
  top: 32px;
  right: 10px;
  cursor: pointer;
`

export const SRow = styled(FlexRow)`
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 6px;
  color: ${COLORS.palette.dark};
  font-size: 13px;
  font-style: normal;
`
