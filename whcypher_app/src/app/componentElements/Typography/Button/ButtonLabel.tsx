import Typography from '../Typography'
import { ITypographyVariantProps } from '../Typography.interface'

const ButtonLabel = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={14} lineHeight="20px" fontWeight={500} {...props} />
}

export default ButtonLabel
