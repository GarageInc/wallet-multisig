import { Tooltip } from '@material-ui/core'
import cn from 'classnames'
import React from 'react'

import { HintMessage } from '../HintMessage/HintMessage'
import { SContainer, SHelpIcon, SLabel, STextField } from './styleds'

interface IProps {
  label?: string
  value: string | number
  onInputChanged: (v: number) => void
  info?: any
  greenInfo?: string
  error?: any
  disabled?: boolean
  extraStyles?: any
  extraClassNames?: string[]
  toolTip?: string
  placeholder?: string
}
const NumberInput = ({
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
  placeholder,
}: IProps) => (
  <SContainer style={extraStyles} className={cn(extraClassNames)}>
    {label && (
      <SLabel>
        <>{label}</>
        {toolTip && (
          <Tooltip arrow placement="top" title={toolTip}>
            <SHelpIcon />
          </Tooltip>
        )}
      </SLabel>
    )}

    <STextField
      InputProps={{ disableUnderline: true }}
      fullWidth
      value={value}
      disabled={disabled}
      onChange={(e) => onInputChanged(+e.target.value)}
      type="number"
      error={!!error}
      placeholder={placeholder}
    />

    <HintMessage info={info} greenInfo={greenInfo} error={error} />
  </SContainer>
)

export default NumberInput
