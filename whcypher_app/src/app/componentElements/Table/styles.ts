import styled from 'styled-components'

import { COLORS } from '../Colors'

export const TableContainer = styled.table`
  width: 100%;
`

export const TH = styled.th`
  text-align: left;
  border-bottom: 1px solid ${() => COLORS.border};
  text-transform: capitalize;
`

export const TR = styled.tr`
  height: 25px;
`

export const TD = styled.td`
  word-break: break-all;
  min-width: 50px;
`
