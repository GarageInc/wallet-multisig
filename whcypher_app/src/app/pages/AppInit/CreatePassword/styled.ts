import { FlexBox } from 'src/app/componentElements'
import TextInput from 'src/app/components/Form/TextInput/TextInput'
import styled from 'styled-components'

export const STextInput = styled(TextInput)`
  max-height: 38px;
  letter-spacing: 5px;
`

export const SContainer = styled(FlexBox)`
  gap: 28px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
