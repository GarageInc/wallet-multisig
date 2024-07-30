import Typography from '../Typography'
import { ITypographyVariantProps } from '../Typography.interface'

const MediumMidGrey = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={14} lineHeight="20px" fontWeight={400} {...props} />
}

export default MediumMidGrey
