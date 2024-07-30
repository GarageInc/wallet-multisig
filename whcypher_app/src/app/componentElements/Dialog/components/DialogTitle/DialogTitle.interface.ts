import { MouseEventHandler, ReactNode } from 'react'

import { TitleProps } from '../../Dialog.interface'

export interface IDialogTitle {
  icon?: ReactNode
  title: string
  onClose?: MouseEventHandler<any>
  hasCloseIcon?: boolean
  titleProps?: TitleProps
}
