import { Box } from '@material-ui/core'
import { Link } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const SContainer = styled(Box)`
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: auto;
  background-color: ${COLORS.palette.lightGrey};
`

export const SLink = styled(Link)`
  margin-left: 6px;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${COLORS.palette.blue};
  }
`
