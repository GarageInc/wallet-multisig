import { MouseEventHandler, ReactNode } from 'react'

import { FooterProps } from '../../Dialog.interface'

export type IDialogFooter = {
  children: ReactNode
  onClose: MouseEventHandler<HTMLButtonElement>
  onSubmit?: (e: any) => void
  submitLabel?: string
  cancelLabel?: string
  noPaddingInFooter?: boolean
  props?: FooterProps
  submitForm?: string
  showCancel?: boolean
}
