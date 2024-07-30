import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

import FlexBox from '../../../FlexBox/FlexBox'
import ScrollingContainer from '../../../ScrollingContainer/ScrollingContainer'

const DialogWrapper = styled.div<{
  isClosing: boolean
  isCentered: boolean
  width: number
  height: number
  dynamicHeight: boolean
  fullHeight: boolean
  highOpacity: boolean
}>`
  background-color: ${COLORS.white};
  height: ${({ height, dynamicHeight, fullHeight }) =>
    dynamicHeight ? 'auto' : fullHeight || height >= 300 ? '574px' : '300px'};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  ${({ isCentered }) =>
    isCentered &&
    `
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  `}
  display: flex;
  flex-direction: column;
  position: ${({ isCentered }) => (isCentered ? 'relative;' : 'absolute;')};
  ${({ isClosing }) => (isClosing ? 'bottom: -1000px;' : `bottom: 0px;`)}
  z-index: ${({ highOpacity }) => (highOpacity ? 1300 : 1301)};
  width: ${({ width }) => width}px;
  margin: 0 8px;
`

const Body = styled(ScrollingContainer).attrs({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
})<{
  hasFooter?: boolean
  noPaddingInBody: boolean
  isClosing: boolean
  padding: string
  height: number
}>`
  padding: ${({ noPaddingInBody, padding }) => (noPaddingInBody ? '0' : padding)};
`

const HeadingWrapper = styled(FlexBox).attrs({
  alignItems: 'center',
  p: '16px 0',
})`
  gap: 16px;
`

export { Body, DialogWrapper, HeadingWrapper }
