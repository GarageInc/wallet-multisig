import styled from 'styled-components'

import FlexBox from '../FlexBox/FlexBox'

const DialogBackground = styled(FlexBox).attrs({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})<{ highOpacity: boolean; isClosing: boolean }>`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  z-index: ${({ highOpacity }) => (highOpacity ? 1300 : 1301)};
  background: rgba(0, 0, 0, 0.7);
`

export { DialogBackground }
