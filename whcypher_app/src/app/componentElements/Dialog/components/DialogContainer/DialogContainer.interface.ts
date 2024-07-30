import { IDialog } from '../../Dialog.interface'

export type IDialogContainer = Omit<IDialog, 'open' | 'onClose' | 'isCloseFromParent'> & {
  isClosing: boolean
  handleClose: () => void
}
