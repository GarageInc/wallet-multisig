import Switch from 'rc-switch'
import { FlexBox, FlexRow, Typography } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import Small from 'src/app/componentElements/Typography/Body/Small'
import AccountsList from 'src/app/components/AccountsList/AccountsList'
import styled from 'styled-components'

export const SContainer = styled(FlexBox)`
  width: 100%;
  padding: 17px 0px 31px 0px;
  flex: 1;

  .accounts-list {
    max-height: initial;
    border: none;
    box-shadow: none;
    margin-left: -12px;
  }

  .account-item {
    padding: 12px 0px 12px 12px;
  }
`

export const SRow = styled(FlexRow)`
  width: 100%;
  justify-content: space-between;
`

export const SLabel = styled(Typography)`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`

export const SLabelSelect = styled(SLabel)`
  margin-top: 24px;
  text-align: left;
`

export const SAccountsList = styled(AccountsList)`
  border: none;
`

export const SWalletsBlock = styled(FlexBox)`
  position: relative;
`

export const SWalletsBlockInternal = styled(FlexBox)``

export const SNotConnected = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex: 1;
  text-align: center;
  margin-top: 16px;
  padding: 16px 0;
`

export const SDescription = styled(Small)`
  color: ${COLORS.palette.darkGrey};
  margin-top: 9px;
  margin-bottom: 24px;
  text-align: left;
`

export const SSwitch = styled(Switch)<{ checked?: boolean }>`
  background-color: ${({ checked }) => (checked ? COLORS.palette.blue : COLORS.palette.lightGrey)} !important;
  border: 1px solid ${({ checked }) => (checked ? COLORS.palette.blue : COLORS.palette.lightGrey)} !important;
  box-shadow: ${({ checked }) => (checked ? COLORS.palette.blue : COLORS.palette.lightGrey)} 0px 0px 0px 20px inset !important;

  height: 23px !important;
  width: 42px !important;

  cursor: pointer;
`
