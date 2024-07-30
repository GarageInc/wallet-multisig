import { Card as _Card, FlexBox, ScrollingContainer as _ScrollContainer } from 'src/app/componentElements'
import FeeSection from 'src/app/pages/WalletPage/SendForm/FeeSection/FeeSection'
import styled from 'styled-components'

export const SFeeSection = styled(FeeSection)`
  margin: 0;
  border: none;
`

export const Card = styled(_Card)`
  box-shadow: none;
  max-height: 260px;
`
export const TabPanel = styled(FlexBox)`
  overflow-x: hidden;
  padding: 8px 20px;
`
export const DetailsInputs = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 15px;
  padding-top: 20px;
  padding-bottom: 37px;
`
export const ScrollingContainer = styled(_ScrollContainer)`
  width: 100% !important;
  height: 162px !important;
  box-shadow: none;
`
export const ParamsContainer = styled(FlexBox).attrs({
  alignItems: 'flex-start',
})`
  box-sizing: border-box;
  padding: 10px;
`
export const Row = styled(FlexBox).attrs({
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
})`
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
`
export const HexContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  word-break: break-all;
  padding-bottom: 15px;
`
