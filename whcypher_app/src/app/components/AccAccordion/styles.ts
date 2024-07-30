import { FlexBox } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const Container = styled(FlexBox).attrs({})<{ activeWallet?: boolean }>`
  cursor: pointer;
  border-left: ${({ activeWallet }) => (activeWallet ? `3px solid ${COLORS.palette.blue}` : 'initial')};
  border-bottom: 1px solid ${COLORS.palette.lightGrey};

  &:last-child {
    border-bottom: none;
  }
`

export const Accordion = styled(FlexBox).attrs({ justifyContent: 'center' })`
  border-bottom: 1px solid black;
  margin-left: 10px;

  &:last-of-type {
    border-bottom: none;
  }
`
