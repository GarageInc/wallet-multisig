import { PrimaryButton, SecondaryButton } from 'src/app/componentElements/Button'
import { COLORS } from 'src/app/componentElements/Colors'
import FlexBox from 'src/app/componentElements/FlexBox/FlexBox'
import { InfoIcon } from 'src/app/componentElements/icons'
import styled from 'styled-components'

export const Container = styled(FlexBox).attrs({
  p: '20px',
})``

export const SInfoIcon = styled(InfoIcon)`
  color: ${COLORS.palette.blue};

  width: 16px;
  height: 16px;
  margin-right: 8px;
`

export const ButtonApprove = styled(PrimaryButton)`
  flex: 1;
`
export const ButtonCancel = styled(SecondaryButton)`
  flex: 1;
`

export const Box = styled.div`
  margin-right: 9px;
`
