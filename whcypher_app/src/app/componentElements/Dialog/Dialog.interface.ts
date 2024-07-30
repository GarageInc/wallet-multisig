import { ReactNode } from 'react'

export interface IDialog {
  open: boolean
  onClose: () => void
  onSubmit?: () => void
  title?: string
  footer?: ReactNode
  children?: ReactNode
  Icon?: ReactNode
  iconLabel?: string
  showFooter?: boolean
  titleIcon?: ReactNode
  submitLabel?: string
  submitForm?: string
  cancelLabel?: string
  noPaddingInBody?: boolean
  noPaddingInFooter?: boolean
  closeOnOutsideClick?: boolean
  highOpacityBackground?: boolean
  isCloseFromParent?: boolean
  titleProps?: TitleProps
  isCentered?: boolean
  footerProps?: FooterProps
  width?: number
  bodyProps?: BodyProps
  dynamicHeight?: boolean
  fullHeight?: boolean
  showCancel?: boolean
}

export interface TitleProps {
  isBackgroundTransparent?: boolean
  showCloseIcon?: boolean
  noPaddingBottomInTitle?: boolean
}

export interface FooterProps {
  showShadow?: boolean
}

export interface BodyProps {
  padding: string
}
