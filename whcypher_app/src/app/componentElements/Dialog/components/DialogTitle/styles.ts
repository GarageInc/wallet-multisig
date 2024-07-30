import { CloseIcon } from 'src/app/componentElements/icons'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

import FlexBox from '../../../FlexBox/FlexBox'

const IconWrapper = styled.div`
  align-self: center;
`

const TitleWrapper = styled(FlexBox).attrs({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: 16,
})<{
  isBackgroundTransparent?: boolean
  noPaddingBottomInTitle?: boolean
}>`
  background-color: ${({ isBackgroundTransparent }) => (isBackgroundTransparent ? 'transparent' : COLORS.palette.grey)};
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  gap: 8px;
  padding-top: 16px;
  padding-bottom: ${({ noPaddingBottomInTitle }) => (noPaddingBottomInTitle ? '0' : '16px')};
`

const TitleBox = styled(FlexBox).attrs({
  flexDirection: 'row',
  alignItems: 'center',
})`
  width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 8px;
`

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`

export { IconWrapper, StyledCloseIcon, TitleBox, TitleWrapper }
