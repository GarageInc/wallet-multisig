import { CheckBoxChecked, CheckBoxUnChecked } from 'src/app/componentElements/icons'

import Checkbox from '../../Checkbox'
import { ICheckbox } from '../../Checkbox.interface'

export const MultiSelectCheckbox = ({ checked, inputRef, onChange, name, onClick }: Omit<ICheckbox, 'children'>) => {
  return (
    <Checkbox checked={checked} inputRef={inputRef} onChange={onChange} name={name} onClick={onClick}>
      {checked ? <CheckBoxChecked /> : <CheckBoxUnChecked />}
    </Checkbox>
  )
}
