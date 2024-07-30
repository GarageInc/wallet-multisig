import { Card, FlexBox } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import Small from 'src/app/componentElements/Typography/Body/Small'
import styled from 'styled-components'

export const SBold = styled(Medium)`
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`

export const Address = styled(Medium)`
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
`

export const URL = styled.div``

export const Link = styled(Small)``

export const Row = styled(FlexBox).attrs({
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
})`
  border-bottom: 1px solid ${COLORS.palette.divider};
  padding: 12px 0;
`

export const Column = styled(FlexBox).attrs({
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
})`
  border-bottom: 1px solid ${COLORS.palette.divider};
  padding: 12px 0;

  &:last-child {
    border-bottom: none;
  }
`

export const SNetwork = styled(Small)`
  align-items: center;
  display: flex;
`

export const SLabeled = styled(Small)``

export const SAction = styled(Small)`
  text-transform: capitalize;
`

export const AddressContainer = styled(FlexBox).attrs({
  justifyContent: 'space-between',
  alignItems: 'flex-start',
})``

export const AmountContainer = styled(AddressContainer)<{ visible?: boolean }>`
  padding: 0;
  align-items: flex-end;
  flex: 2;
  display: ${({ visible }) => (visible ? 'inherit' : 'none')};
`

export const AssetIcon = styled.img.attrs({
  width: '17px',
  height: '17px',
  alt: 'AssetIcon',
})`
  margin-left: 6px;
`

export const StyledCard = styled(Card)``

export const Left = styled(FlexBox)`
  align-items: flex-start;
`

export const Right = styled(FlexBox)`
  align-items: flex-end;
`

export const Container = styled.div`
  padding: 8px 20px;
  background-color: ${COLORS.palette.lightGrey};
`
