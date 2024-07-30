import { css } from 'styled-components'

import { IconButtonVariant } from './IconButton.interface'

const variantRoundedStyles = css`
  border-radius: 8px;
  padding: 8px;
  width: 32px;
  height: 32px;
`

const variantCircleStyles = css`
  min-width: 22px;
  background-color: transparent;
`

export const getVariantStyles = (variant: IconButtonVariant) => {
  switch (variant) {
    case IconButtonVariant.rounded:
      return variantRoundedStyles

    case IconButtonVariant.circle:
      return variantCircleStyles
  }
}
