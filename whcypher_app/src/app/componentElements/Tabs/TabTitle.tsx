import { useCallback } from 'react'
import DarkGrey from 'src/app/componentElements/Typography/Body/DarkGrey'
import styled from 'styled-components'

import { COLORS } from '../Colors'
import type { ITabTitle } from './Tab.interface'

const TabTitle = ({ title, setSelectedTab, index, selectedTab, handleClick }: ITabTitle) => {
  const onClick = useCallback(() => {
    setSelectedTab(index)
    handleClick()
  }, [setSelectedTab, index, handleClick])

  return (
    <TitleWrapper onClick={onClick} $active={index === selectedTab}>
      {index === selectedTab ? (
        <SSelected fontSize={16} fontWeight={500}>
          {title}
        </SSelected>
      ) : (
        <DarkGrey fontSize={16} fontWeight={500}>
          {title}
        </DarkGrey>
      )}
    </TitleWrapper>
  )
}

const SSelected = styled(DarkGrey)`
  color: ${COLORS.palette.blue};
`

const TitleWrapper = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  ${({ $active }) => $active && `border-bottom: 2px solid ${COLORS.palette.blue};`}
  min-width: 60px;
  height: 32px;
  justify-content: center;
  text-transform: capitalize;
`

export default TabTitle
