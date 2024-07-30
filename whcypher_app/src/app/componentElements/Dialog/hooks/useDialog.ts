import { useCallback, useEffect, useState } from 'react'
import { useDialogDelayClose } from 'src/app/hooks/useDialogDelayClose'

import { IDialog } from '../Dialog.interface'

interface IUseDialog {
  open: IDialog['open']
  onClose: IDialog['onClose']
  closeOnOutsideClick: IDialog['closeOnOutsideClick']
  isCloseFromParent: IDialog['isCloseFromParent']
}

export const useDialog = ({ open, onClose, closeOnOutsideClick, isCloseFromParent }: IUseDialog) => {
  const { isClosing, handleClose } = useDialogDelayClose({ onClose })

  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    //Setting this ensures that that the dialog only opens once it's mounted
    setIsOpen(open)
  }, [open])

  const outsideClickHandler = useCallback(
    (e: any) => {
      e.stopPropagation()
      if (closeOnOutsideClick) {
        handleClose()
      }
    },
    [closeOnOutsideClick, handleClose],
  )

  useEffect(() => {
    if (isCloseFromParent) {
      handleClose()
    }
  }, [handleClose, isCloseFromParent])

  return {
    isOpen,
    isClosing,
    handleClose,
    outsideClickHandler,
  }
}
