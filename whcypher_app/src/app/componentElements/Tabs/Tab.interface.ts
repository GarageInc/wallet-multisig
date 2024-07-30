import { ReactElement, ReactNode } from 'react'

export type ITabs = {
  children: ReactElement[]
}

export type ITab = {
  title: string
  className?: string
  handleClick: () => void
  children?: ReactNode
}

export type ITabTitle = {
  title: string
  index: number
  selectedTab: number
  setSelectedTab: (index: number) => void
  handleClick: () => void
}
