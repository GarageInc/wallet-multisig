import { MenuItem, Tooltip } from '@material-ui/core'
import cx from 'classnames'
import React from 'react'

import { HintMessage } from '../HintMessage/HintMessage'
import { SContainer, SHelpIcon, SLabel, SSelectInput } from './styleds'

interface IProps {
  label: string
  value: string | number
  onInputChanged: (v: string) => void
  info?: string
  greenInfo?: string
  error?: string
  disabled?: boolean
  extraStyles?: any
  extraClassNames?: string[]
  toolTip?: string
  list: any[]
}

const SelectInput = ({
  label,
  value,
  onInputChanged,
  info,
  greenInfo,
  error,
  disabled,
  extraStyles,
  extraClassNames,
  toolTip,
  list,
}: IProps) => (
  <SContainer style={extraStyles} className={cx(extraClassNames)}>
    <SLabel>
      <>{label}</>
      {toolTip && (
        <Tooltip arrow placement="top" title={toolTip}>
          <SHelpIcon />
        </Tooltip>
      )}
    </SLabel>

    <SSelectInput
      fullWidth
      value={value}
      onChange={(e) => onInputChanged(e.target.value as string)}
      disabled={disabled}
      disableUnderline
      error={!!error}
    >
      {list.map((entry) => {
        if (typeof entry === 'string') {
          return (
            <MenuItem key={entry} value={entry}>
              {entry}
            </MenuItem>
          )
        } else {
          return (
            <MenuItem key={entry.id} value={entry.id}>
              {entry.name}
            </MenuItem>
          )
        }
      })}
    </SSelectInput>

    <HintMessage info={info} greenInfo={greenInfo} error={error} />
  </SContainer>
)

export default SelectInput
