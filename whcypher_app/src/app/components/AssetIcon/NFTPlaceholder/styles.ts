import { FlexBox } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: ${COLORS.backgroundGrey};
  border-radius: 4px;
  justify-content: center;
`

export const IconWrapper = styled(FlexBox).attrs({
  alignItems: 'center',
  justifyContent: 'center',
})`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${COLORS.backgroundGrey};
`

export const LabelBox = styled(FlexBox).attrs({
  justifyContent: 'center',
  alignItems: 'center',
})`
  margin-top: 8px;
  text-align: center;
`
