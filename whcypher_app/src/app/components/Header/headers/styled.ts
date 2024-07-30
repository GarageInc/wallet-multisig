import { FlexBox } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import Small from 'src/app/componentElements/Typography/Body/Small'
import styled from 'styled-components'

export const SContainer = styled(FlexBox)`
  padding: 20px 20px;
  border-bottom: 1px solid ${COLORS.palette.lightGrey};
`

export const SStep = styled(Small)`
  text-transform: uppercase;
  font-site: 12px;
`
