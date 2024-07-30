import { ReactNode } from 'react'

export interface IBadge {
  children: ReactNode
  isActive?: boolean
  onClick?: (e: any) => void
  className?: string
}
