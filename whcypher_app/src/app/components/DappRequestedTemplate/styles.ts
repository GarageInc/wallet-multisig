import { FlexBox, Link as L, PrimaryButton, SecondaryButton } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: ${COLORS.backgroundGrey};
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`

export const Content = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  list-style: none;
  margin: 0;
  box-sizing: border-box;
  flex: 1 1 auto;
  overflow: auto;
  row-gap: 24px;

  li {
    margin-left: 0;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 13px;
  padding: 20px;
  position: relative;
  overflow: hidden;
`

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: flex-start;
  padding-left: 12px;
  width: calc(100% - 15vw);
`

export const Title = styled.span`
  margin-top: 9px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
`

export const Link = styled(L)`
  text-align: unset;
`

export const Logo = styled.i`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`

export const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  overflow: auto;
`

export const Section = styled.section`
  letter-spacing: 0.35px;
  padding: 10px;
  display: flex;
  flex-direction: row-reverse;
`

export const WalletTitle = styled(FlexBox)`
  min-width: 72px;
  height: 21px;
  border-radius: 54px;
  align-items: center;
  justify-content: center;
`

export const Chain = styled(FlexBox)`
  flex: 1;
  text-align: right;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

export const ChainIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 3px;
`

export const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 15px;

  svg {
    margin-right: 5px;
  }
`

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 3;
`

export const RejectButton = styled(SecondaryButton)`
  margin-right: 10px;
`

export const ConfirmButton = styled(PrimaryButton)``

export const MessageBlock = styled.div`
  margin: 12px 0;
  overflow-x: auto;
  flex: 1;
  height: 100%;
  max-height: 292px;
  display: flex;

  .react-json-view {
    flex: 1;
    margin: auto;
  }

  > .react-json-view {
    word-break: break-all;
  }
`

export const WarningMessageContainer = styled(FlexBox).attrs({
  padding: '22px 8px 8px 8px',
  alignItems: 'center',
})`
  border-radius: 8px;
  row-gap: 16px;
`
