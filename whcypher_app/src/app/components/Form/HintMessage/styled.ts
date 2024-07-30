import { COLORS } from 'src/app/componentElements/Colors'
import Small from 'src/app/componentElements/Typography/Body/Small'
import styled from 'styled-components'

export const SMessageWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: -19px;
`

export const SMessage = styled(Small)`
  text-align: left;
  color: ${COLORS.palette.red};
  width: 100%;
  font-weight: 400;
`

export const SInfo = styled.div`
  font-size: 12px;
  text-align: left;
  color: ${COLORS.palette.darkGrey};
  font-weight: 400;
  width: 100%;
`

export const SGreenInfo = styled.div`
  font-size: 12px;
  text-align: left;
  color: ${COLORS.palette.green};
  width: 100%;
`

export const SError = styled.div`
  font-size: 12px;
  text-align: left;
  color: ${COLORS.palette.red};
  width: 100%;
`
