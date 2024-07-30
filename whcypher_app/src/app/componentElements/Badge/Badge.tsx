import { IBadge } from './Badge.interfaces'
import { Container } from './styles'

export const Badge = ({ children, isActive, onClick, className }: IBadge) => {
  return (
    <Container isActive={isActive} onClick={onClick} className={className}>
      <>{children}</>
    </Container>
  )
}
