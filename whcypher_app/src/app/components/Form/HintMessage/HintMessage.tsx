import { SError, SGreenInfo, SInfo, SMessageWrapper } from './styled'

export const HintMessage = ({ info, greenInfo, error }: { greenInfo?: string; info?: string; error: string }) => {
  return (
    <SMessageWrapper>
      {info && <SInfo>{info}</SInfo>}
      {greenInfo && <SGreenInfo>{greenInfo}</SGreenInfo>}
      {error && <SError>{error}</SError>}
    </SMessageWrapper>
  )
}
