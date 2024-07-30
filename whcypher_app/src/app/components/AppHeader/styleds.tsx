import { AppBar, IconButton, Toolbar } from '@material-ui/core'
import { FlexBox } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import { DownIcon } from 'src/app/componentElements/icons'
import styled from 'styled-components'

export const SToolbar = styled(Toolbar)`
  min-height: initial;
  padding: 0;
`

export const SRight = styled(FlexBox)`
  flex-direction: row;
  align-items: center;
`

export const AppBarStyled = styled(AppBar)``

export const SContainer = styled(FlexBox)`
  background-color: ${COLORS.palette.blue};
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 50px;
  padding: 0 20px;
`

export const SLogo = styled(FlexBox)`
  display: flex;
`

export const SAccountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SAccountNameWrapper = styled.div`
  width: 100px;
  text-align: center;
`

export const STextMenuTitle = styled.div`
  margin-left: 10px !important;
`

export const SIconButton = styled(IconButton)`
  padding: 9px;
`

export const SAvatarImage = styled.img`
  width: 32px;
  height: 32px;
`

export const SDownIcon = styled(DownIcon)`
  position: relative;
  left: -8px;
  margin-right: -11px;
  cursor: pointer;
`
