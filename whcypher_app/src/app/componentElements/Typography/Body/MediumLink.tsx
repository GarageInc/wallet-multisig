import { COLORS } from '../../Colors'
import Typography from '../Typography'
import { ITypographyVariantProps } from '../Typography.interface'

const MediumLink = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={14} {...props} color={COLORS.palette.blue} />
}

export default MediumLink
