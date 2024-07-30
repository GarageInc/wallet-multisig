import { IconButton } from '@material-ui/core'
import { FlexBox } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import H3 from 'src/app/componentElements/Typography/Headings/H3'
import styled from 'styled-components'

export const STitleContainer = styled(FlexBox)`
  justify-content: space-between;
  text-align: left;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid ${COLORS.palette.lightGrey};
  flex-direction: row;
  margin-bottom: 12px;
  cursor: pointer;
`

export const STitle = styled(FlexBox)`
  flex-direction: row;
  align-items: center;
`
export const STitleLabel = styled(H3)`
  text-transform: uppercase;
  margin-left: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
`

export const SImg = styled.img`
  width: 28px;
  height: 28px;
`

export const SRight = styled(FlexBox)`
  margin-left: auto;
  flex-direction: row;
  gap: 8px;
`

export const SIconButton = styled(IconButton)`
  padding: 0px;
`
