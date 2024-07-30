import { ITypographyVariantProps } from 'src/app/componentElements/Typography/Typography.interface'

import Typography from '../Typography'

const TotalBalance = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={28} lineHeight="32px" fontWeight={600} {...props} />
}

export default TotalBalance
