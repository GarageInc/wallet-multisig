import styled from 'styled-components'

import FlexBox from '../FlexBox/FlexBox'
import type { ICard } from './Card.interface'

export const CardContainer = styled(FlexBox)<ICard>`
  ${(props) => !props.noShadow && `box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);`}
  ${(props) => props.round && `border-radius: 8px;`}
`
