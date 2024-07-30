import { ITypographyVariantProps } from 'src/app/componentElements/Typography/Typography.interface'

import Typography from '../Typography'

const H1 = ({ ...props }: ITypographyVariantProps) => {
  return <Typography fontSize={30} lineHeight="33px" fontWeight={500} {...props} />
}

export default H1
