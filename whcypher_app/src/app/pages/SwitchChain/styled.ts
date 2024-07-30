import { DashLine, FlexBox } from 'src/app/componentElements'
import { LeftArrowIcon } from 'src/app/componentElements/icons'
import styled from 'styled-components'

export const Container = styled(FlexBox).attrs({
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  flexDirection: 'column',
})`
  margin: 0 16px;
`

export const ChainIcon = styled.img.attrs({
  width: '40px',
  height: '40px',
  alt: 'ChainIcon',
})`
  margin: 0 8px;
`

export const Row = styled(FlexBox)`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 24px;
`

export const ChainLine = styled(DashLine)`
  width: 40px;
`

export const ChainSwitchIcon = styled(LeftArrowIcon)`
  transform: rotate(180deg);
  margin: 0 8px;
  width: 20px;
  height: 20px;
`
