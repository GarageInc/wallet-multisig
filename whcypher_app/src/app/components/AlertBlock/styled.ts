import { Badge } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const SAlertBlock = styled.div`
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  gap: 10px;
  border-radius: 4px;
  background: ${COLORS.palette.lightRed};
  color: ${COLORS.palette.red};
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 16px;
`

export const SAlertBadge = styled(Badge)`
  color: ${COLORS.palette.white};
  background-color: ${COLORS.palette.red};
  border-radius: 20px;
  display: flex;
  min-width: 16px;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

export const SLink = styled.span`
  color: ${COLORS.palette.blue};
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
`
