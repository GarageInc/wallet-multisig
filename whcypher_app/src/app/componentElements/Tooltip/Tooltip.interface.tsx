import type { Placement } from '@popperjs/core'
import { ReactNode } from 'react'

/**
 * ToolTip props
 */
export interface ITooltip {
  title: ReactNode
  delay?: number
  fitContent?: boolean
  fullWidth?: boolean
  arrow?: boolean
  placement?: Placement
  wordBreak?: boolean
  noIndents?: boolean
  children: ReactNode
}
