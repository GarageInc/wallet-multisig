import { FC } from 'react'
import { COLORS } from 'src/app/componentElements/Colors'
import ButtonLabel from 'src/app/componentElements/Typography/Button/ButtonLabel'
import styled from 'styled-components'

import { PrimaryButton, SecondaryButton } from '../../../Button/Button'
import FlexBox from '../../../FlexBox/FlexBox'
import { IDialogFooter } from './DialogFooter.interface'

const ButtonLabelPrimary = styled(ButtonLabel)`
  color: ${COLORS.palette.white};
`

// TODO: do not style footer, there are different footer designs

export const DialogFooter: FC<IDialogFooter> = ({
  children,
  onClose,
  onSubmit,
  showCancel = true,
  submitForm,
  submitLabel,
  cancelLabel,
  noPaddingInFooter = false,
  props = { showShadow: true },
}) => {
  const { showShadow } = props
  if (children) {
    return (
      <Footer showShadow={false} noPaddingInFooter={noPaddingInFooter}>
        {children}
      </Footer>
    )
  }

  return (
    <Footer showShadow={showShadow} noPaddingInFooter={noPaddingInFooter}>
      {showCancel && (
        <FooterButtonWrapper>
          <SecondaryButton
            fullWidth
            onClick={(e: any) => {
              e.stopPropagation()
              onClose(e)
            }}
          >
            <ButtonLabel>{cancelLabel ? cancelLabel : 'Cancel'}</ButtonLabel>
          </SecondaryButton>
        </FooterButtonWrapper>
      )}
      <FooterButtonWrapper>
        <PrimaryButton
          fullWidth
          onClick={(e: any) => {
            e.stopPropagation()
            onSubmit && onSubmit(e)
          }}
          form={submitForm}
        >
          <ButtonLabelPrimary>{submitLabel ? submitLabel : 'Submit'}</ButtonLabelPrimary>
        </PrimaryButton>
      </FooterButtonWrapper>
    </Footer>
  )
}

const Footer = styled(FlexBox).attrs({
  flexDirection: 'row',
  gap: 16,
})<{ showShadow?: boolean; noPaddingInFooter: boolean }>`
  padding: ${({ noPaddingInFooter }) => (noPaddingInFooter ? '0' : '16px 8px')};
`

const FooterButtonWrapper = styled(FlexBox).attrs({
  px: 4,
})`
  width: 100%;
`
