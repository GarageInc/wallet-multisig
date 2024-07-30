import { useEffect, useRef, useState } from 'react'
import H2 from 'src/app/componentElements/Typography/Headings/H2'

import FlexBox from '../../../FlexBox/FlexBox'
import { DialogFooter } from '../DialogFooter'
import { DialogTitle } from '../DialogTitle'
import { IDialogContainer } from './DialogContainer.interface'
import { Body, DialogWrapper, HeadingWrapper } from './styles'

function useForceUpdate() {
  const [, setValue] = useState(0) // integer state
  return () => setValue((value) => value + 1) // update state to force render
  // A function that increment 👆🏻 the previous state like here
  // is better than directly setting `setValue(value + 1)`
}

export const DialogContainer = ({
  isClosing,

  isCentered = false,
  width = 384,
  title,
  titleIcon,
  handleClose,
  titleProps,
  showFooter,
  noPaddingInBody = false,
  bodyProps = {
    padding: '8px',
  },
  showCancel = true,
  Icon,
  iconLabel,
  children,
  onSubmit,
  submitLabel,
  cancelLabel,
  noPaddingInFooter,
  footerProps,
  submitForm,
  footer,
  highOpacityBackground,
  dynamicHeight = false,
  fullHeight = false,
}: IDialogContainer) => {
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight)
    }
  }, [setHeight])

  useEffect(() => {
    //Force update to re-render the component since ref isn't able to get the height on initial render on some components
    if (!dynamicHeight) {
      forceUpdate()
    }
  }, [dynamicHeight, forceUpdate])

  return (
    <DialogWrapper
      isClosing={isClosing}
      isCentered={isCentered}
      width={width}
      dynamicHeight={dynamicHeight}
      height={height}
      fullHeight={fullHeight}
      highOpacity={!!highOpacityBackground}
    >
      <FlexBox ref={ref} height={fullHeight ? '100%' : 'auto'}>
        {!!title && <DialogTitle icon={titleIcon} onClose={handleClose} title={title} titleProps={titleProps} />}
        <FlexBox justifyContent="space-between" height="100%">
          <Body
            isClosing={isClosing}
            hasFooter={showFooter}
            noPaddingInBody={noPaddingInBody}
            height={height}
            {...bodyProps}
          >
            {!!(Icon || iconLabel) && (
              <HeadingWrapper>
                {!!Icon && Icon}
                {!!iconLabel && <H2>{iconLabel}</H2>}
              </HeadingWrapper>
            )}
            {children}
          </Body>
          {showFooter && (
            <DialogFooter
              onClose={handleClose}
              onSubmit={onSubmit}
              submitLabel={submitLabel}
              cancelLabel={cancelLabel}
              noPaddingInFooter={noPaddingInFooter}
              props={footerProps}
              submitForm={submitForm}
              showCancel={showCancel}
            >
              {footer}
            </DialogFooter>
          )}
        </FlexBox>
      </FlexBox>
    </DialogWrapper>
  )
}
