import { Dialog } from '../../Dialog'
import { IDialog } from '../../Dialog.interface'

export const FLOATING_CENTERED_DIALOG_CONFIGS = {
  titleProps: {
    isBackgroundTransparent: true,
    showCloseIcon: false,
    noPaddingBottomInTitle: true,
  },
  isCentered: true,
  footerProps: {
    showShadow: false,
  },
  width: 320,
  bodyProps: {
    padding: '16px 16px 0 16px',
  },
  footer: undefined,
  dynamicHeight: true,
}

export const FloatingDialog = ({ ...props }: IDialog) => <Dialog {...props} {...FLOATING_CENTERED_DIALOG_CONFIGS} />
