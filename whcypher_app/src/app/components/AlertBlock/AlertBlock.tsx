import { ReactNode } from 'react'

import { SAlertBadge, SAlertBlock } from './styled'

export const AlertBlock = ({ onClick, text }: { onClick?: () => void; text: string | ReactNode }) => {
  return (
    <SAlertBlock onClick={onClick}>
      <SAlertBadge>!</SAlertBadge>
      <span>{text} &nbsp;</span>
    </SAlertBlock>
  )
}
