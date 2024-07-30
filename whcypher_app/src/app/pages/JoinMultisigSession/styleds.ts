import { FlexBox, FlexRow } from 'src/app/componentElements'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import styled from 'styled-components'

export const SDescription = styled(FlexBox)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 20;
  flex-direction: column;
  gap: 16px;
`

export const SRow = styled(FlexRow)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const SBold = styled(Medium)`
  font-weight: 500;
`
