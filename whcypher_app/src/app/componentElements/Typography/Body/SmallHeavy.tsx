import Typography from '../Typography'
import { ITypographyVariantProps } from '../Typography.interface'

const Small = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={12} lineHeight="16px" fontWeight={600} {...props} />
}

export default Small
