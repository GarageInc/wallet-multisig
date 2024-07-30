import { ReactNode, useRef, useState } from 'react'
import styled from 'styled-components'

import FlexBox from '../FlexBox/FlexBox'

const Container = styled(FlexBox)<{ isScrolling: boolean }>`
  overflow-y: auto;
  overflow-x: hidden;
  ${({ isScrolling }) =>
    isScrolling &&
    `box-shadow: inset 0px 10px 10px -3px rgb(0 0 0 / 30%);
-webkit-box-shadow: inset 0px 10px 10px -3px rgb(0 0 0 / 30%);
-moz-box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.3) inset;`}
`

interface ScrollingContainerProps {
  children: ReactNode
  className?: string
}

// style ScrollingContainer to add height to enable scrolling
const ScrollingContainer = ({ children, className }: ScrollingContainerProps) => {
  const [isScrolling, setScrolling] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  return (
    <Container
      className={className}
      ref={ref}
      isScrolling={isScrolling}
      onScroll={() => {
        if (ref.current?.scrollTop !== 0 && !isScrolling) setScrolling(true)
        else if (ref.current?.scrollTop === 0 && isScrolling) setScrolling(false)
      }}
    >
      <div style={{ height: '100%' }}> {children} </div>
    </Container>
  )
}
export default ScrollingContainer
