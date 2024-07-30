import { FC } from 'react'

import Portal from '../Portal/Portal'
import { DialogContainer } from './components'
import { IDialog } from './Dialog.interface'
import { useDialog } from './hooks/useDialog'
import { DialogBackground } from './styles'

export const Dialog: FC<IDialog> = ({
  open,
  onClose,
  onSubmit,
  title,
  titleProps,
  iconLabel,
  titleIcon,
  Icon,
  children,
  footer = null,
  showFooter = true,
  noPaddingInBody,
  noPaddingInFooter = false,
  showCancel = true,
  submitLabel,
  submitForm,
  cancelLabel,
  closeOnOutsideClick = false,
  highOpacityBackground = true,
  isCloseFromParent = false,
  isCentered,
  footerProps,
  width,
  bodyProps,
  dynamicHeight,
  fullHeight,
}) => {
  const { isOpen, isClosing, handleClose, outsideClickHandler } = useDialog({
    open,
    onClose,
    closeOnOutsideClick,
    isCloseFromParent,
  })

  const containerProps = {
    isClosing,

    isCentered,
    width,
    title,
    titleIcon,
    handleClose,
    titleProps,
    showCancel,
    showFooter,
    noPaddingInBody,
    bodyProps,
    Icon,
    iconLabel,
    onSubmit,
    submitLabel,
    cancelLabel,
    noPaddingInFooter,
    footerProps,
    submitForm,
    footer,
    dynamicHeight,
    highOpacityBackground,
    fullHeight,
  }

  return isOpen ? (
    <Portal id="main">
      {isCentered ? (
        <DialogBackground highOpacity={highOpacityBackground} isClosing={isClosing} onClick={outsideClickHandler}>
          <DialogContainer {...containerProps}>{children}</DialogContainer>
        </DialogBackground>
      ) : (
        <>
          <DialogBackground highOpacity={highOpacityBackground} isClosing={isClosing} onClick={outsideClickHandler} />
          <DialogContainer {...containerProps}>{children}</DialogContainer>
        </>
      )}
    </Portal>
  ) : null
}
