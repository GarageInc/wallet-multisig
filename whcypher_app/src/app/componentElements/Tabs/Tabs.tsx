import { useState } from 'react'
import styled from 'styled-components'

import { COLORS } from '../Colors'
import type { ITabs } from './Tab.interface'
import TabTitle from './TabTitle'

const Container = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  margin: 0;
  padding: 0;
  cursor: pointer;
  margin-top: 12px;
  border-bottom: 1px solid ${COLORS.palette.divider};
`

const Tabs = ({ children }: ITabs) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <Container>
      {children.map((item, index) => (
        <TabTitle
          key={index}
          title={item.props.title}
          index={index}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
          handleClick={item.props.handleClick}
        />
      ))}

      {children[selectedTab]}
    </Container>
  )
}

export default Tabs
