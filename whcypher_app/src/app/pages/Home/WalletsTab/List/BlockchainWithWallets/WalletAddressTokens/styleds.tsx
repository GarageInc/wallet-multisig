import { FlexBox, Typography } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import Small from 'src/app/componentElements/Typography/Body/Small'
import styled from 'styled-components'

export const SContainer = styled(FlexBox)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const SAddress = styled(Small)`
  color: ${COLORS.palette.darkGrey};
  font-weight: 400;
`

export const SLeft = styled(FlexBox)`
  flex-direction: row;
  align-items: center;

  font-size: 13px;
  font-style: normal;
  font-weight: 400;

  color: ${COLORS.palette.darkGrey};
  gap: 8px;
`

export const SRight = styled(Typography)`
  flex-direction: row;
  align-items: center;
  text-align: right;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  color: ${COLORS.palette.darkGrey};
`

export const SNew = styled(Typography)`
  color: ${COLORS.palette.white};
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  padding: 2px 4px;
  background-color: ${COLORS.palette.blue};
  border-radius: 20px;
`
