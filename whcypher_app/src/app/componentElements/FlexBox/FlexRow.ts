import { memo } from 'react'
import { IFlexBox } from 'src/app/componentElements/FlexBox/FlexBox.interface'
import styled from 'styled-components'
import { compose, flex, flexbox, gridGap, layout, position, space } from 'styled-system'

/**
 * FlexBox Component
 * Default flex-direction is column and can accept multiple useful parameters
 */
const FlexRow = styled.div(
  { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  compose(flexbox, flex, space, layout, position, gridGap),
)

export default memo<IFlexBox>(FlexRow)
