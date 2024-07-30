import { IconButton, TextField } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { FlexBox, PrimaryButton, Typography } from 'src/app/componentElements'
import { Borders } from 'src/app/componentElements/Border'
import { COLORS } from 'src/app/componentElements/Colors'
import { CheckIcon } from 'src/app/componentElements/icons'
import styled from 'styled-components'

export const SContainer = styled.div`
  padding: 20px 22px 5px 22px;
  display: flex;
  justify-content: center;
  position: relative;
  background: ${COLORS.palette.lightGrey};
`

export const SAccountName = styled(Typography)`
  font-size: 20px;
  font-weight: 500;
  max-width: 207px;
  color: ${COLORS.palette.dark};
  font-weight: 500;
  fontsize: 20;
  overflow-wrap: 'break-word';
`

export const SAccountEditIcon = styled(EditIcon)`
  color: ${COLORS.palette.darkGrey};
  width: 16px;
  height: 16px;

  &:hover {
    cursor: pointer;
    color: ${COLORS.palette.blue};
  }
`

export const SAccountCheckIcon = styled(CheckIcon)`
  color: ${COLORS.palette.blue};
  width: 16px;
`

export const SOptionsBtn = styled.div`
  position: absolute;
  right: 22px;
  top: 20px;
  bottom: 0;
`

export const STabsContainer = styled(FlexBox)`
  flex-direction: row;
  grid-gap: 10px;
  margin-top: 20px;
  justify-content: center;
`

export const SLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0 2px;
`

export const SLink = styled(FlexBox)`
  padding: 8px 0;
  color: ${COLORS.palette.blue};
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  &:hover {
    cursor: pointer;
  }
`

export const SAccountNameWrapper = styled(FlexBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

export const SHeader = styled(FlexBox)``

export const SLabel = styled.span`
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  margin-left: 4px;
`

export const STab = styled(PrimaryButton)<{ active?: boolean }>`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-width: 92px;
  background-color: ${({ active }) => (active ? COLORS.palette.blue : COLORS.palette.bluelishGrey)};
  color: ${({ active }) => (active ? COLORS.palette.white : COLORS.palette.darkGrey)};
  border-radius: ${Borders.radius.small};
  height: 32px;

  &:hover {
    background-color: ${COLORS.palette.blueHover};
    color: ${COLORS.palette.white};
  }
`

export const SIconButton = styled(IconButton)`
  padding: 0px;
  margin: -12px 0 -12px 8px;
`

export const STextField = styled(TextField)`
  max-width: 204px;

  .MuiInput-root {
    background: none;
    border: none !important;

    &:hover {
      border: none !important;
    }
  }

  input {
    color: ${COLORS.palette.dark};
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    background: none;
    padding: 0px;
    border-right: none !important;
    border-left: none !important;
    border-top: none !important;
    border-bottom: 1px solid ${COLORS.palette.dark};
    margin-bottom: -1px;
    border-radius: 0px;

    &:hover {
      border-right: none !important;
      border-left: none !important;
      border-top: none !important;
      border-bottom: 1px solid ${COLORS.palette.dark};
    }
  }
`
