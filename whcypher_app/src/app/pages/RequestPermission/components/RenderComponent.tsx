import { Container } from '@material-ui/core'
import React from 'react'

const RenderComponent = ({ children }: { children: any }) => (
  <div>
    <Container style={{ padding: 0, background: '#fff' }}>{children}</Container>
  </div>
)

export default RenderComponent
