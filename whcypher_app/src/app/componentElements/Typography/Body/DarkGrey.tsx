import { COLORS } from '../../Colors'
import Typography from '../Typography'
import { ITypographyVariantProps } from '../Typography.interface'

const DarkGrey = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={14} color={COLORS.palette.darkGrey} lineHeight="20px" fontWeight={400} {...props} />
}

export default DarkGrey
