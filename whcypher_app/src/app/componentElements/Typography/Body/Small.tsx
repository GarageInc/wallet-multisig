import Typography from '../Typography'
import { ITypographyVariantProps } from '../Typography.interface'

const Small = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={13} lineHeight="16px" fontWeight={500} {...props} />
}

export default Small
