import { Box } from '@material-ui/core'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const SContainer = styled(Box)<{ isActivity: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  ::-webkit-scrollbar-track {
    background: ${({ isActivity }) => (isActivity ? COLORS.palette.lightBlue : 'inherit')};
  }
`
