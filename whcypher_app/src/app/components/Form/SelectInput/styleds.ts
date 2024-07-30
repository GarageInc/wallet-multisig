import { InputLabel, Select } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import { FlexBox } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const SContainer = styled(FlexBox)`
  position: relative;
`

export const SLabel = styled(InputLabel)`
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`

export const SHelpIcon = styled(HelpIcon)`
  display: inline-flex;
  padding: 0;
  margin-left: 5px;

  font-size: 14px;
  color: ${COLORS.palette.darkGrey};
`

export const SSelectInput = styled(Select)``
