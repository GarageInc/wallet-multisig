import { FlexBox } from 'src/app/componentElements'
import styled from 'styled-components'

export const Container = styled(FlexBox).attrs({
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  flexDirection: 'column',
})`
  margin: 0 16px;
`
