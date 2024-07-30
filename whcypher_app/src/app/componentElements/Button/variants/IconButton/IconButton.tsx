import styled, { css } from 'styled-components'

import FlexBox from '../../../FlexBox/FlexBox'
import { IconButtonProps, IconButtonVariant, IconButtonWrapperProps } from './IconButton.interface'
import { getVariantStyles } from './styles'

const IconButton = ({
  onClick,
  icon,
  variant = IconButtonVariant.circle,
  containedWithinCicle = false,
  background,
  disabled,
}: IconButtonProps) => {
  return (
    <IconButtonWrapper
      onClick={onClick}
      variant={variant}
      $containedWithinCicle={containedWithinCicle}
      background={background}
      $disabled={disabled}
    >
      <IconWrapper variant={variant}>
        {typeof icon === 'string' ? <img src={icon} alt="icon-button-icon" /> : icon}
      </IconWrapper>
    </IconButtonWrapper>
  )
}

const IconButtonWrapper = styled(FlexBox).attrs({
  justifyContent: 'center',
  alignItems: 'center',
})<IconButtonWrapperProps>`
  cursor: pointer;
  min-width: 24px;
  min-height: 32px;
  border-radius: 8px;
  background: ${({ background }) => background};

  &:hover {
  }

  ${({ $containedWithinCicle = false }) =>
    $containedWithinCicle &&
    css`
      box-shadow: rgb(255 255 255 / 30%) 0px 0px 2px;

      &:hover {
        box-shadow: rgb(255 255 255 / 30%) 0px 0px 6px;
      }
    `}

  ${({ variant }) => getVariantStyles(variant)}

  ${({ $disabled }) =>
    $disabled &&
    css`
      transition: unset;
      border: none;
      cursor: unset;

      &:active {
        pointer-events: none;
      }
    `}
`

const IconWrapper = styled(FlexBox).attrs({
  justifyContent: 'center',
  alignItems: 'center',
})<{
  variant: IconButtonVariant
}>`
  position: relative;
  width: 100%;

  & > img {
    object-fit: cover;
    width: auto;
  }
`

export default IconButton
