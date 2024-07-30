import { Badge } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const RequestsAmountBadge = styled(Badge)`
  color: ${COLORS.palette.white};
  background-color: ${COLORS.palette.yellow};
  border-radius: 20px;
  display: flex;
  width: 16px;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: -7px;
  top: 20px;
`

export const BackupRequiredBadge = styled(Badge)`
  color: ${COLORS.palette.white};
  background-color: ${COLORS.palette.red};
  border-radius: 20px;
  display: flex;
  width: 16px;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: -7px;
  top: 20px;
`
