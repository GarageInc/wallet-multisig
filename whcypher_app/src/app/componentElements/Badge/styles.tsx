import { FlexBox } from 'src/app/componentElements/index'
import styled from 'styled-components'

export const Container = styled(FlexBox).attrs({
  justifyContent: 'center',
  alignItems: 'center',
})<{
  isActive?: boolean
}>`
  box-sizing: border-box;
  padding: 2px 4px;
  background: transparent;
  cursor: pointer;
  border-radius: 20px;
  justify-content: center;
`
