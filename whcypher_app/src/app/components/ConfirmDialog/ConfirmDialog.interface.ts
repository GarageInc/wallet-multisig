import { ReactElement } from 'react'

export interface IConfirmDialog {
  onClose: () => void
  onSubmit?: (val?: any) => void
  open: boolean
  children?: string | ReactElement | null
  dialogTitle?: string
  submitLabel?: string
  showFooter?: boolean
  showCancel?: boolean
}
