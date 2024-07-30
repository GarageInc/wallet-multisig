import { ReactNode } from 'react'

import { SWarningBadge, SWarningBlock } from './styled'

export const WarningBlock = ({ text }: { text: string | ReactNode }) => {
  return (
    <SWarningBlock>
      <SWarningBadge>!</SWarningBadge>
      <div>{text}</div>
    </SWarningBlock>
  )
}
