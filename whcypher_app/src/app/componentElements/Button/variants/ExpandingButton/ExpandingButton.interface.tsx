import { MouseEvent } from 'react'

export interface ExpandingButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  disabled?: boolean
  label: string
}
