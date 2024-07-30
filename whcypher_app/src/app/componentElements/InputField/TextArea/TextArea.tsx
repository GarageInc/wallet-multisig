import Error from 'src/app/componentElements/Typography/Body/Error'
import Label from 'src/app/componentElements/Typography/Label/Label'
import { memo, useState } from 'react'
import { EyeCloseIcon, EyeIcon } from 'src/app/componentElements/icons'
import FlexBox from 'src/app/componentElements/FlexBox/FlexBox'

import { ITextArea } from '../InputField.interface'
import { ErrorMsg, EyeButton, TextArea as StyledTextArea, TextAreaContainer, TextAreaIconContainer } from '../styles'

interface EyeAdornmentProps {
  showPassword: boolean
  setShowPassword: (arg: boolean) => void
}

const EyeAdornment = ({ showPassword, setShowPassword }: EyeAdornmentProps) => (
  <TextAreaIconContainer onClick={() => setShowPassword(!showPassword)}>
    <EyeButton>
      {!showPassword ? (
        <EyeIcon width={16} height={16} color="grey" />
      ) : (
        <EyeCloseIcon width={16} height={16} color="grey" />
      )}
    </EyeButton>
  </TextAreaIconContainer>
)

/**
 * Search Input Field Component
 * @constructor
 */
const TextArea = ({
  label,
  errorMsg,

  placeholder,
  inputRef,
  defaultValue,
  onChange,
  autoFocus,
  spellCheck,
  name,
  className,
  disabled,
  value,
  type = 'text',
  ...props
}: ITextArea) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <FlexBox className={className} gridGap="8px">
      {label && (
        <FlexBox ml={8}>
          <Label>{label}</Label>
        </FlexBox>
      )}
      <TextAreaContainer>
        <StyledTextArea
          name={name}
          placeholder={placeholder}
          ref={inputRef}
          defaultValue={defaultValue}
          onChange={onChange}
          autoFocus={autoFocus}
          spellCheck={spellCheck}
          disabled={disabled}
          value={value}
          $error={!!errorMsg}
          $type={type === 'text' || showPassword ? 'text' : 'password'}
          {...props}
        />
        {type === 'password' && <EyeAdornment showPassword={showPassword} setShowPassword={setShowPassword} />}
      </TextAreaContainer>
      <ErrorMsg $animateIn={!!errorMsg}>
        <Error>{errorMsg}</Error>
      </ErrorMsg>
    </FlexBox>
  )
}

export default memo(TextArea)
