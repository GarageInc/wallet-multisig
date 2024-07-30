import { FlexBox } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled, { css } from 'styled-components'

export const BackButtonContainer = styled.div`
  position: absolute;
  left: 10px;
`

export const Wrapper = styled(FlexBox).attrs({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
})`
  height: 100%;
  width: 100%;
  position: absolute;
`

export const BackgroundImg = styled.img`
  position: absolute;
  inset: 0;
  width: inherit;
  height: inherit;
`
export const BodyContainer = styled(FlexBox)<{ $isPopup: boolean }>`
  width: 3500px;
  height: 600px;
  z-index: 2;
  position: relative;
  ${({ $isPopup }) => $isPopup && `width: 100%;`}
`
export const HeaderWrapper = styled.div`
  position: relative;
  height: 48px;
`
export const LoadingContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

export const Content = styled(FlexBox).attrs(({ contentVariant }: { contentVariant: boolean }) => ({
  flex: 1,
  m: contentVariant ? '0' : '0 10px 10px',
}))<{ contentVariant?: boolean }>`
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  overflow-x: hidden;

  ${({ contentVariant }) =>
    contentVariant &&
    css`
      overflow-y: hidden !important;
      flex-direction: column;
      justify-content: space-between;
    `}
`

export const FormHeaderContainer = styled(FlexBox).attrs({
  m: '0 10px',
  flexDirection: 'row',
  alignItems: 'center',
})`
  height: 40px;

  border-bottom: 1px solid ${COLORS.border};
`
export const FormHeaderLabel = styled(FlexBox).attrs({
  alignItems: 'center',
})`
  heiht: 40px;
`
