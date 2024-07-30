import H3 from 'src/app/componentElements/Typography/Headings/H3'
import { FC } from 'react'

import { IDialogTitle } from './DialogTitle.interface'
import { IconWrapper, StyledCloseIcon, TitleBox, TitleWrapper } from './styles'

export const DialogTitle: FC<IDialogTitle> = ({
  title,
  icon,
  onClose,
  titleProps = {
    isBackgroundTransparent: false,
    showCloseIcon: true,
    noPaddingBottomInTitle: false,
  },
}) => {
  const { isBackgroundTransparent, showCloseIcon, noPaddingBottomInTitle } = titleProps
  return (
    <TitleWrapper
      onClick={onClose}
      isBackgroundTransparent={isBackgroundTransparent}
      noPaddingBottomInTitle={noPaddingBottomInTitle}
    >
      <TitleBox>
        {!!icon && <IconWrapper>{icon}</IconWrapper>}
        <H3>{title}</H3>
      </TitleBox>
      {showCloseIcon && <StyledCloseIcon onClick={onClose} color={undefined} />}
    </TitleWrapper>
  )
}
