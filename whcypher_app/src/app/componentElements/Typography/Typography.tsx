import type { ITypography } from 'src/app/componentElements/Typography/Typography.interface'
import styled from 'styled-components'
import { color, compose, flex, layout, position, space, system, typography } from 'styled-system'

import { COLORS } from '../Colors'
/**
 * Typography component
 */
const Typography = styled.div<ITypography>`
  line-height: normal;
  font-size: 15px;
  color: ${COLORS.palette.dark};

  ${compose(
    typography,
    color,
    space,
    flex,

    layout,
    position,

    system({
      overflow: {
        property: 'overflow',
        scale: 'overflow',
        defaultScale: ['visible', 'hidden', 'scroll', 'auto'],
      },
      textOverflow: {
        property: 'textOverflow',
        scale: 'text-overflow',
        defaultScale: ['ellipsis', 'clip', 'initial', 'inherit', 'string'],
      },
      whiteSpace: {
        property: 'whiteSpace',
        scale: 'white-space',
        defaultScale: ['normal', 'break-spaces', 'nowrap'],
      },
    }),
  )}
`

export default Typography
