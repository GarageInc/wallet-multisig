export enum IconButtonVariant {
  rounded = 'rounded',
  circle = 'circle',
}

export interface IconButtonProps {
  onClick?: () => void
  icon: React.ReactElement | string
  variant?: IconButtonVariant
  disabled?: boolean
  fullWidth?: boolean
  type?: 'button' | 'reset' | 'submit'
  containedWithinCicle?: boolean
  background?: string
}

export interface IconButtonWrapperProps {
  variant: IconButtonVariant
  $containedWithinCicle?: boolean
  background?: string
  $disabled?: boolean
}
