import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { FlexBox, Icon } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import H1 from 'src/app/componentElements/Typography/Headings/H1'
import styled from 'styled-components'

export const SContainer = styled(FlexBox)`
  padding: 0 20px;
  flex: 1;
`

export const SText = styled(H1)`
  font-size: 24px;
  font-weight: 500;
  width: 220px;
  margin: 0 auto;
`

export const SIcon = styled(Icon)`
  width: 100px;
  height: 100px;
  color: ${COLORS.palette.blue};
  text-align: center;
  margin: 24px auto;
`

export const SActionText = styled(Medium)``

export const SBtnIcon = styled(ArrowBackIcon)`
  font-size: 30px;
  color: ${COLORS.palette.white};
`
