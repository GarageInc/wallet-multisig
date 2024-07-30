import Typography from '../Typography'
import { ITypographyVariantProps } from '../Typography.interface'

const Medium = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={15} lineHeight="20px" fontWeight={400} {...props} />
}

export default Medium
