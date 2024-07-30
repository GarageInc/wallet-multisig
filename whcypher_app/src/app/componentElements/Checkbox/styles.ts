import styled from 'styled-components'

import FlexBox from '../FlexBox/FlexBox'

/**
 * We need to hide the Checkbox inorder for span to toggle it
 * Basically, the span becomes the checkbox. We cannot use
 * visibility: hidden or display:none to hide it as the event
 * listeners get removed. Therefore, we have to send it into oblivion.
 */

const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  opacity: 0;
`

/**
 * We use label as a wrapper so the checkbox
 * can be clicked and the value can be toggled
 */

const Wrapper = styled(FlexBox)`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export { CheckboxInput, Wrapper }
