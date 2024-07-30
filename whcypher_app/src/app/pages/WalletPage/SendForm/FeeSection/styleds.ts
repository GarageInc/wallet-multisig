import { InputLabel, Slider } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import { FlexBox, FlexRow } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import Small from 'src/app/componentElements/Typography/Body/Small'
import styled from 'styled-components'

export const SContainer = styled(FlexBox)`
  padding: 16px 0px 0px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  border-radius: 4px;
  border-top: 1px solid ${COLORS.palette.lightGrey};
`

export const SToggle = styled(Medium)`
  color: ${COLORS.palette.blue};
  margin-left: auto;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 9px;
`

export const SRow = styled(FlexRow)`
  width: 100%;
  gap: 20px;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 0;
  }
`

export const SSlider = styled(Slider)`
  padding: 0;
`

export const SFees = styled(FlexBox)`
  width: 100%;
  margin-top: 12px;
`

export const SLabel = styled(InputLabel)`
  margin-bottom: 4px;
  text-align: left;
  align-items: center;
  display: flex;
  flex-direction: row;
`

export const SSmall = styled(Small)`
  text-align: left;
  font-weight: 400;
  font-size: 12px;
  margin-left: auto;
`

export const SHelpIcon = styled(HelpIcon)`
  display: inline-flex;
  padding: 0;
  margin-left: 5px;

  font-size: 14px;
  color: ${COLORS.palette.darkGrey};
`

export const SManualFee = styled(FlexBox)`
  width: 100%;
`
