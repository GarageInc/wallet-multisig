import Typography from '../Typography'
import { ITypographyVariantProps } from '../Typography.interface'

const LargeDarkGrey = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={16} lineHeight="20px" fontWeight={400} {...props} />
}

export default LargeDarkGrey
