import { TickIcon } from 'src/app/componentElements/icons'
import styled from 'styled-components'

import Checkbox from '../../Checkbox'
import { ICheckbox } from '../../Checkbox.interface'

export const SingleSelectCheckbox = ({
  checked,
  inputRef,
  onChange,
  name,
  color,
}: Omit<ICheckbox, 'children'> & {
  color?: string
}) => {
  return (
    <Checkbox checked={checked} inputRef={inputRef} onChange={onChange} name={name}>
      {checked ? <TickIcon color={color} /> : <EmptyPlaceholder />}
    </Checkbox>
  )
}

const EmptyPlaceholder = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`
