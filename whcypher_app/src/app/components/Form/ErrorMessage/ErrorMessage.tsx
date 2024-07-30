import { SLabel, SMessage, SMessageWrapper } from './styled'

export const ErrorMessage = ({ message, info }: { message?: string; info?: string }) => {
  if (!message && !info) return null

  return (
    <SMessageWrapper>
      {message && <SMessage>{message}</SMessage>}
      {info && <SLabel>{info}</SLabel>}
    </SMessageWrapper>
  )
}
