import { ITypographyVariantProps } from 'src/app/componentElements/Typography/Typography.interface'
import styled, { css } from 'styled-components'

import _Typography from '../Typography'

const Typography = styled(_Typography).attrs({
  fontSize: 12,
  lineHeight: '16px',
  fontWeight: 500,
  letterSpacing: '0.25px',
})<{ withHover?: boolean }>`
  text-transform: uppercase;

  ${({ theme, withHover }) =>
    withHover &&
    css`
      &:hover {
        color: white;
      }
    `}
`
const Label = ({ withHover, ...props }: ITypographyVariantProps & { withHover?: boolean }) => (
  <Typography withHover={withHover} lineHeight="16px" letterSpacing="0.25px" fontWeight={500} {...props} />
)

export default Label
