import { memo } from 'react'
import FlexBox from 'src/app/componentElements/FlexBox/FlexBox'

import { Container } from './styles'
export interface IPopupContainer {
  body: React.ReactElement
  footer?: React.ReactElement
  header?: React.ReactElement
}

export enum DAPP_STEPS {
  TRANSACTION = 'TRANSACTION',
  SIGN = 'SIGN',
  CONNECTION = 'CONNECTION',
  APPROVE_CONNECTION = 'APPROVE_CONNECTION',
  WATCH_ASSET = 'WATCH_ASSET',
}

/**
 * Ext Popup Container
 */
const PopupContainer = ({ header, body, footer }: IPopupContainer) => {
  return (
    <Container>
      {header && header}
      <FlexBox flex={1}>{body}</FlexBox>
      {footer && footer}
    </Container>
  )
}

export default memo(PopupContainer)
