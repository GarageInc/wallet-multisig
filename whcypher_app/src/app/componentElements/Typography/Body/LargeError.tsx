import Typography from '../Typography'
import { ITypographyVariantProps } from '../Typography.interface'

const LargeError = ({ children, textOverflow, overflow }: ITypographyVariantProps) => {
  return (
    <Typography fontSize={16} lineHeight="24px" fontWeight={400} textOverflow={textOverflow} overflow={overflow}>
      {children}
    </Typography>
  )
}

export default LargeError
