import Card from 'src/app/componentElements/Card/Card'
import { COLORS } from 'src/app/componentElements/Colors'
import FlexBox from 'src/app/componentElements/FlexBox/FlexBox'
import styled from 'styled-components'

export const Container = styled(Card).attrs({
  round: false,
  noShadow: true,
})`
  border-bottom: 1px solid ${COLORS.border};
`

export const Box = styled(FlexBox).attrs({ justifyContent: 'start', flex: 1 })`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
  width: 30px;
  margin-left: 15px;
`

export const SelectAllWrapper = styled(FlexBox).attrs({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})`
  margin: 0 48px 0 34px;
  padding-top: 4px;
`

export const SelectBox = styled.div`
  margin-right: 10px;
  cursor: pointer;
  min-width: 60px;
  user-select: none;
  align-items: center;
  display: flex;
`

export const WalletItemContainer = styled(FlexBox)`
  overflow-y: auto;
  z-index: 1;
  max-height: 207px;
  scrollbar-gutter: stable;
  margin-top: 4px;
  padding: 0 22px;
`
