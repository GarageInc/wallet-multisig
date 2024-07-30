import { memo } from 'react'
import type { ICard } from 'src/app/componentElements/Card/Card.interface'

import { CardContainer } from './styles'

/**
 * Card Component
 */
const Card = ({ children, noShadow = false, className, ...props }: ICard) => {
  return (
    <CardContainer noShadow={noShadow} className={className} {...props}>
      {children}
    </CardContainer>
  )
}

export default memo(Card)
