import Typography from '../Typography'
import { ITypographyVariantProps } from '../Typography.interface'

const SmallUpOnly = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={12} lineHeight="16px" fontWeight={500} {...props} />
}

export default SmallUpOnly
