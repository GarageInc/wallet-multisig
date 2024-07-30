import { ReactNode } from 'react'

export interface ILink {
  children: ReactNode
  to?: string
  variant?: string
  className?: string
  onClick?: () => void
}
