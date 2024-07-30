import { Tooltip } from '@material-ui/core'
import cx from 'classnames'
import React from 'react'

import { HintMessage } from '../HintMessage/HintMessage'
import { SContainer, SHelpIcon, SLabel, STextField } from './styleds'

interface IProps {
  label?: string
  type?: string
  value?: string
  onInputChanged?: (v: string) => void
  info?: any
  greenInfo?: string
  error?: string
  disabled?: boolean
  extraStyles?: any
  extraClassNames?: string[]
  toolTip?: string
  readOnly?: boolean
  placeholder?: string
  textArea?: boolean
  rows?: any
  icon?: any
  className?: string
}

const TextInput = ({
  label,
  type,
  value,
  onInputChanged,
  info,
  greenInfo,
  error,
  disabled,
  extraStyles,
  extraClassNames,
  toolTip,
  readOnly = false,
  placeholder,
  textArea,
  rows,
  icon,
  className,
}: IProps) => (
  <SContainer style={extraStyles} className={cx(extraClassNames)}>
    {label && (
      <SLabel>
        {label}
        {toolTip && (
          <Tooltip arrow placement="top" title={toolTip}>
            <SHelpIcon />
          </Tooltip>
        )}
      </SLabel>
    )}

    <STextField
      InputProps={{ disableUnderline: true, readOnly }}
      value={value}
      disabled={disabled}
      onChange={(e) => onInputChanged && onInputChanged(e.target.value)}
      placeholder={placeholder}
      type={type}
      multiline={textArea}
      rows={rows}
      className={className}
      error={!!error}
      hasIcon={!!icon}
    />

    {icon}

    <HintMessage info={info} greenInfo={greenInfo} error={error} />
  </SContainer>
)

export default TextInput
