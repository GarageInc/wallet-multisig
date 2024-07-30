import Typography from '../Typography'
import { ITypographyVariantProps } from '../Typography.interface'

const Large = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={24} lineHeight="24px" fontWeight={400} {...props} />
}

export default Large
