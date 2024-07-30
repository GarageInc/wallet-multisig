import { COLORS } from 'src/app/componentElements/Colors'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import Small from 'src/app/componentElements/Typography/Body/Small'
import styled from 'styled-components'

export const SActivity = styled.div``

export const SNotExpandedActivity = styled.div`
  position: relative;
  text-align: left;
  padding: 12px 2px 12px 20px;
  height: 63px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SName = styled(Medium)`
  font-size: 16px;
  font-weight: 500;
`

export const SDate = styled(Small)`
  color: ${COLORS.palette.darkGrey};
  font-weight: 400;
`
