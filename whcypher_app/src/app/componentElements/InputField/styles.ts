import { HTMLInputTypeAttribute } from 'react'
import { InfoIcon } from 'src/app/componentElements/icons'
import styled from 'styled-components'

import FlexBox from '../FlexBox/FlexBox'

export const InputContainer = styled(FlexBox).attrs({
  flexDirection: 'row',
  alignItems: 'center',
})<{ $error: boolean; $isWebapp: boolean }>`
  position: relative;
  border-radius: 8px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid transparent;

  &:hover,
  &:focus,
  &:focus-within {
    opacity: 1;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  }

  &:hover {
    ${({ $isWebapp }) => !$isWebapp && `border-color: white;`}
  }

  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  input[data-autocompleted] {
    background-color: transparent !important;
  }
`

export const Input = styled.input<{ $error: boolean; $isWebapp: boolean }>`
  flex: 1;
  height: 100%;
  max-width: 100%;

  border: none;
  font-size: 14px;
  padding: 0;
  &:focus {
    outline: none;
  }
  &::placeholder {
  }
`

export const ErrorMsg = styled.div.attrs({})<{ $animateIn: boolean }>`
  margin-left: 8px;
  opacity: 0;
  transition-property: margin-top, margin-bottom, opacity;
  transition-duration: 300ms;
  ${({ $animateIn }) => $animateIn && `opacity: 1; margin-top: 4px; margin-bottom: 2px;`}
`

export const WarningMsg = styled.div`
  margin-top: 4px;
  margin-right: 8px;
  text-align: right;
`

export const TipIconWrapper = styled(FlexBox).attrs({
  alignItems: 'center',
  justifyContent: 'center',
})`
  padding: 0 4px 0 1px;
  height: 30px;
  cursor: default;
`

export const TipIcon = styled(InfoIcon).attrs<{ $error: boolean }>(({}) => ({
  width: 12,
  height: 12,
}))<{ $error: boolean }>``

export const EyeButton = styled.div`
  width: 20px;
  cursor: pointer;
`

export const TextAreaContainer = styled(FlexBox).attrs({
  gridGap: '8px',
  flexDirection: 'row',
})<{ $error?: boolean }>`
  position: relative;
  border-radius: 8px;

  padding: 0 8px;
  border: 1px solid transparent;

  &:hover {
  }

  &:focus,
  &:focus-within {
    opacity: 1;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  }

  &:focus,
  &:focus-within {
  }

  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  input[data-autocompleted] {
    background-color: transparent !important;
  }
`

export const TextAreaIconContainer = styled(FlexBox).attrs({
  alignItems: 'center',
  pt: 8,
})`
  position: relative;
  cursor: pointer;
`

export const TextArea = styled.textarea<{
  $error: boolean
  $type: HTMLInputTypeAttribute
}>`
  border: none;
  flex: 1;
  height: 100%;
  font-size: 14px;
  background: transparent;
  height: 110px;
  padding: 12px 8px !important;
  resize: none;
  box-sizing: content-box;

  -webkit-text-security: ${({ $type }) => ($type === 'text' ? `none` : `disc`)};

  &::placeholder {
  }

  &:focus {
    outline: none;
    border: none !important;
  }
`
