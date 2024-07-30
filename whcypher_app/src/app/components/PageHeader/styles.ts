import { FlexRow, Typography } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const SBox = styled(FlexRow)`
  max-height: 36px;
  max-width: 36px;
  height: 36px;
  width: 36px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${COLORS.palette.bluelishGrey};
  cursor: pointer;

  &:hover {
    background: ${COLORS.palette.lightGrey};
  }
`

export const SContainer = styled(FlexRow)`
  gap: 8px;
`

export const STitle = styled(Typography)`
  color: #000;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  word-wrap: break-word;
  max-width: 220px;
  margin: 0 auto;
  padding-right: 36px;
`
