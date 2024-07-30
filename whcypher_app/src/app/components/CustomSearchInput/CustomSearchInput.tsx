import { memo } from 'react'
import { InputField } from 'src/app/componentElements'
import { CrossIcon, MagnifyingGlassIcon } from 'src/app/componentElements/icons'
import { IInputField } from 'src/app/componentElements/InputField/InputField.interface'

/**
 * Input Field Component
 * @constructor
 */
const SearchInput = (props: IInputField) => {
  return (
    <InputField
      width="100%"
      startAdornment={<MagnifyingGlassIcon width={12} height={12} />}
      endAdornment={
        <CrossIcon width={12} height={12} style={{ cursor: 'pointer' }} onClick={props.adornmentClickHandler} />
      }
      {...props}
    />
  )
}

export default memo(SearchInput)
