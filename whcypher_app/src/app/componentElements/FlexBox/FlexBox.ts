import { memo } from 'react'
import { IFlexBox } from 'src/app/componentElements/FlexBox/FlexBox.interface'
import styled from 'styled-components'
import { compose, flexbox, gridGap, layout, position, space } from 'styled-system'

/**
 * FlexBox Component
 * Default flex-direction is column and can accept multiple useful parameters
 */
const FlexBox = styled.div(
  { display: 'flex', flexDirection: 'column' },
  compose(flexbox, space, layout, position, gridGap),
)

export default memo<IFlexBox>(FlexBox)
