import { memo } from 'react'

import { TableContainer, TD, TH, TR } from './styles'
import type { ITable } from './Table.interface'

/**
 * Table Component
 * @constructor
 */
const Table = ({ data, keys, ...props }: ITable) => {
  return (
    <TableContainer {...props}>
      <thead>
        <TR>
          <TH>#</TH>
          {keys.map((key) => (
            <TH key={key}>{key}</TH>
          ))}
        </TR>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <TR key={idx}>
            <TD>{idx + 1}</TD>
            {keys.map((key) => (
              <TD key={key}>{row[key]}</TD>
            ))}
          </TR>
        ))}
      </tbody>
    </TableContainer>
  )
}

export default memo(Table)
