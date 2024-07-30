import { ReactNode } from 'react'
import { FlexProps, SpaceProps, TextAlignProps, TypographyProps } from 'styled-system'

/**
 * Typography prop types
 */
export type ITypography = TypographyProps &
  SpaceProps &
  FlexProps & {
    textOverflow?: ITextOverFlow
    overflow?: IOverFlow
    whiteSpace?: IWhiteSpace
  }

export type ITextOverFlow = 'unset' | 'ellipsis' | 'clip'
export type IOverFlow = 'visible' | 'hidden' | 'scroll' | 'auto'
export type IWhiteSpace = 'normal' | 'break-spaces' | 'nowrap' | 'pre-wrap'

export interface ITypographyVariantProps {
  children: string | number | ReactNode
  textOverflow?: ITextOverFlow
  overflow?: IOverFlow
  whiteSpace?: IWhiteSpace
  textAlign?: TextAlignProps['textAlign']
  fontWeight?: number | string
  fontSize?: string | number
  mt?: string
  ml?: string
  mb?: string
  onClick?: () => void
  className?: string
}
