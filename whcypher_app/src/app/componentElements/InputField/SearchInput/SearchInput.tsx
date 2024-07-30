import { memo } from 'react'
import { SearchIcon } from 'src/app/componentElements/icons'
import styled, { css } from 'styled-components'

import InputField from '../InputField'
import { IInputField } from '../InputField.interface'
import CloseIcon from './../../../static/image/close_white.svg'

type SearchInputProps = Omit<IInputField, 'type'>

/**
 * Search Input Field Component
 * @constructor
 */
const SearchInput = (props: SearchInputProps) => {
  return (
    <Search
      type="search"
      startAdornment={<SearchIcon width={12} height={12} color="grey" />}
      fullWidth={props.fullWidth}
      {...props}
    />
  )
}

const Search = styled(InputField)<{ fullWidth?: boolean }>`
  input {
    width: 100%;
  }

  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 12px;
    width: 12px;
    border-radius: 50em;
    background: url(${CloseIcon.toString()}) no-repeat 50% 50%;
    background-size: contain;
    opacity: 0;
    pointer-events: none;
  }

  &:hover {
    border: none;
  }

  input[type='search']:focus::-webkit-search-cancel-button {
    opacity: 1;
    pointer-events: all;
    cursor: pointer;
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`

export default memo(SearchInput)
