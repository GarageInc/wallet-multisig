import { ITypographyVariantProps } from 'src/app/componentElements/Typography/Typography.interface'

import Typography from '../Typography'

const H2 = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={20} lineHeight="20px" fontWeight={500} {...props} />
}

export default H2
