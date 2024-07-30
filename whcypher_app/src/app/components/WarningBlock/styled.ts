import { Badge } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const SWarningBlock = styled.div`
  display: flex;
  padding: 12px;
  align-items: flex-start;
  text-align: left;
  gap: 10px;
  border-radius: 4px;
  background: ${COLORS.palette.lightYellow};
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 16px;
`

export const SWarningBadge = styled(Badge)`
  color: ${COLORS.palette.white};
  background-color: ${COLORS.palette.yellow};
  border-radius: 20px;
  display: flex;
  min-width: 16px;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`
