import Typography from '../../Typography'
import { ITypographyVariantProps } from '../../Typography.interface'

type XdBodyProps = ITypographyVariantProps & { color?: string }

const XsBase = ({ color, ...props }: XdBodyProps) => {
  return <Typography fontSize={10} lineHeight="16px" color={color} fontWeight={500} {...props} />
}

export default XsBase
