import { Button as MuiButton, ButtonProps as ButtonMuiProps } from '@material-ui/core'
import { FC, SVGAttributes } from 'react'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

import { COLORS } from '../Colors'
import { Loader } from './Loader'

const Wrapper = styled(MuiButton)`
  ${space}
`

export interface ButtonProps extends SpaceProps, ButtonMuiProps {
  StartIcon?: FC<SVGAttributes<SVGElement>>
  loading?: boolean
}

export const Button = ({ children, loading, StartIcon, ...props }: ButtonProps) => {
  return (
    <Wrapper {...props}>
      {StartIcon && <StartIcon width={16} height={16} color="currentColor" />}
      {loading ? <Loader /> : children}
    </Wrapper>
  )
}

export const ButtonComp = Button

type SpecialButtonProps = Omit<ButtonProps, 'variant'>

export const PrimaryButton = (props: SpecialButtonProps) => {
  return <Button color="primary" variant="contained" {...props} />
}

export const SecondaryButton = (props: SpecialButtonProps) => {
  return (
    <Button
      style={{
        backgroundColor: COLORS.palette.white,
        color: COLORS.palette.blue,
        border: `2px solid ${COLORS.palette.blue}`,
        fontSize: '15px',
      }}
      {...props}
    />
  )
}

export const WarningButton = (props: SpecialButtonProps) => {
  return <Button {...props} />
}
