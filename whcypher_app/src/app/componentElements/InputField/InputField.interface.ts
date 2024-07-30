import { IFlexBox } from 'src/app/componentElements/FlexBox/FlexBox.interface'
import * as React from 'react'
import { InputHTMLAttributes } from 'react'

/**
 * Input Field Prop Types
 */
export type IInputField = IFlexBox &
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string // input field label
    errorMsg?: string // error message
    warningMsg?: string
    startAdornment?: React.ReactNode // start adornment component
    endAdornment?: React.ReactNode // end adornment component
    tipInfo?: string // tip modal dialog info
    inputRef?: React.Ref<any> // input component ref
    isWebapp?: boolean // web app mode
    tipError?: string
    tipPlacement?: 'top' | 'bottom' | 'left' | 'right'
    adornmentClickHandler?: () => void
    textAlign?: TextAlign
    fullWidth?: boolean
  }

/**
 * Text Area Prop Types
 */
export type ITextArea = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string // input field label
  errorMsg?: string // error message
  endAdornment?: React.ReactNode // end adornment component
  tipInfo?: string // tip modal dialog info
  inputRef?: React.Ref<any> // input component ref
  tipError?: string
  className?: string
}

export enum TextAlign {
  Right = 'right',
  Left = 'left',
}
