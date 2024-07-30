import { IconButton, Typography } from '@material-ui/core'
import { FlexBox } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const SContainer = styled(FlexBox)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const SLeft = styled(FlexBox)`
  flex-direction: row;
  align-items: center;
`

export const SRight = styled(Typography)`
  flex-direction: row;
  align-items: center;
  text-align: right;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
`

export const STitle = styled(Typography)`
  font-size: 15px;
  font-style: normal;
  text-align: left;
  color: ${COLORS.palette.dark};
  margin-right: 4px;
  font-weight: 400;
  display: flex;
  align-items: center;
`

export const SIconButton = styled(IconButton)`
  padding: 0;
`
