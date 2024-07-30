import { memo, useCallback } from 'react'

import { ICheckbox } from './Checkbox.interface'
import { CheckboxInput, Wrapper } from './styles'

/**
 * Checkbox Component
 * @param props
 * @constructor
 */
const Checkbox = ({ checked = false, onChange, inputRef, children, name }: ICheckbox) => {
  const onChangeHandler = useCallback(() => {
    if (onChange) onChange(!checked)
  }, [checked, onChange])

  return (
    <Wrapper as="label" data-value={checked}>
      <CheckboxInput name={name} ref={inputRef} onChange={onChangeHandler} />
      {children}
    </Wrapper>
  )
}

export default memo(Checkbox)
