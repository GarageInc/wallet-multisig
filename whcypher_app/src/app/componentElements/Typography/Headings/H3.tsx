import { ITypographyVariantProps } from 'src/app/componentElements/Typography/Typography.interface'

import Typography from '../Typography'

const H3 = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={16} lineHeight="16px" fontWeight={500} {...props} />
}

export default H3
