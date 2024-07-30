import Error from 'src/app/componentElements/Typography/Body/Error'
import Warning from 'src/app/componentElements/Typography/Body/Warning'
import Label from 'src/app/componentElements/Typography/Label/Label'
import { memo, useMemo, useState } from 'react'
import { EyeCloseIcon, EyeIcon } from 'src/app/componentElements/icons'

import FlexBox from '../FlexBox/FlexBox'
import Tooltip from '../Tooltip/Tooltip'
import type { IInputField } from './InputField.interface'
import { TextAlign } from './InputField.interface'
import { ErrorMsg, EyeButton, Input, InputContainer, TipIcon, TipIconWrapper, WarningMsg } from './styles'

/**
 * InputField Component
 */
const InputField = ({
  type,
  label,
  errorMsg,
  warningMsg,
  startAdornment,
  endAdornment,
  tipInfo,

  placeholder,
  inputRef,
  defaultValue,
  onChange,
  onKeyPress,
  autoFocus,
  isWebapp = false,
  spellCheck,
  name,
  tipError,
  min,
  disabled,
  value,
  tipPlacement = 'left',
  autoComplete = 'off',
  onFocus,
  textAlign = TextAlign.Left,
  className,
  ...props
}: IInputField) => {
  const [inputType, setType] = useState(type)

  const _startAdornment = useMemo(() => {
    if (startAdornment) return <FlexBox mr={10}>{startAdornment}</FlexBox>
    return null
  }, [startAdornment])

  // right component
  const _endAdornment = useMemo(() => {
    if (endAdornment) return <FlexBox ml={5}>{endAdornment}</FlexBox>
    if (type === 'password') {
      // password field
      return (
        <EyeButton onClick={() => setType(inputType === 'password' ? 'text' : 'password')}>
          {inputType === 'password' ? (
            <EyeIcon width={16} height={16} color="grey" />
          ) : (
            <EyeCloseIcon width={16} height={16} color="grey" />
          )}
        </EyeButton>
      )
    }
    if (tipError || tipInfo) {
      // tooltip component
      return (
        <Tooltip title={tipError || tipInfo} arrow fitContent placement={tipPlacement}>
          <TipIconWrapper>
            <TipIcon $error={!!tipError} />
          </TipIconWrapper>
        </Tooltip>
      )
    }
    return null
  }, [endAdornment, inputType, tipError, tipInfo, tipPlacement, type])

  return (
    <FlexBox {...props} className={className}>
      {label && (
        <FlexBox pb={8} ml={8}>
          <Label>{label}</Label>
        </FlexBox>
      )}
      <InputContainer
        $isWebapp={isWebapp}
        $error={!!errorMsg || !!tipError}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        onClick={onFocus}
      >
        {_startAdornment}
        <Input
          style={{ textAlign }}
          name={name}
          type={inputType}
          placeholder={placeholder}
          $error={!!errorMsg}
          ref={inputRef}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          onChange={onChange}
          onKeyPress={onKeyPress}
          autoFocus={autoFocus}
          spellCheck={spellCheck}
          min={min}
          disabled={disabled}
          value={value}
          $isWebapp={isWebapp}
          onFocus={onFocus}
        />
        {_endAdornment}
      </InputContainer>
      <ErrorMsg $animateIn={!!errorMsg}>
        <Error>{errorMsg}</Error>
      </ErrorMsg>
      {warningMsg && (
        <WarningMsg>
          <Warning>{warningMsg}</Warning>
        </WarningMsg>
      )}
    </FlexBox>
  )
}

export default memo<IInputField>(InputField)
