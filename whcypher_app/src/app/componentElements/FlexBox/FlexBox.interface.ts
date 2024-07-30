import {
  FlexboxProps,
  GridGapProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
} from 'styled-system'
import { DataHTMLAttributes, RefAttributes } from 'react'

export type IFlexBox = DataHTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement> &
  FlexboxProps &
  SpaceProps &
  LayoutProps &
  PositionProps &
  GridGapProps
