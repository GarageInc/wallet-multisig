import Header from 'containers/Layout/Header'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import { HTMLAttributes, ReactChild, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { FormHeader } from 'source/components'
import { BackButton, FlexBox, LinearProgress } from 'source/modules'
import H2 from 'src/app/componentElements/Typography/Headings/H2'

import {
  BackButtonContainer,
  BodyContainer,
  Content,
  FormHeaderContainer,
  FormHeaderLabel,
  HeaderWrapper,
  LoadingContainer,
  Wrapper,
} from './styles'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  hasBackAction?: boolean
  hasHeaderControls?: boolean
  header?: ReactChild
  footer?: ReactChild
  hasCustomHeader?: ReactChild
  hasCustomContent?: boolean
  onBack?: () => void
  isPopup?: boolean
  isAlternativeVariant?: boolean
  /**
   * if true, display a linear progress bar (indeterminate)
   */
  loading?: boolean
  disableBackButton?: boolean
  className?: string
  title?: string
}

const Container = ({
  children,
  hasCustomContent = false,
  hasCustomHeader,
  footer,
  hasHeaderControls = true,
  header,
  hasBackAction = true,
  onBack,
  loading = false,
  isPopup = false,
  isAlternativeVariant,
  disableBackButton,
  title,
  className,
}: ContainerProps) => {
  const history = useHistory()

  const handleBackAction = useCallback(() => {
    if (onBack) {
      onBack()
      return
    }

    history.goBack()
  }, [history, onBack])

  const breadcrumEl = useMemo(
    () =>
      (hasBackAction || title) && (
        <FlexBox flexDirection="row" alignItems="center" height={48} justifyContent="center">
          {hasBackAction && (
            <BackButtonContainer>
              <BackButton onClick={handleBackAction} disabled={disableBackButton} />
            </BackButtonContainer>
          )}
          {title && <H2>{title}</H2>}
        </FlexBox>
      ),
    [hasBackAction, title, handleBackAction, disableBackButton],
  )
  const contentEl = useMemo(
    () =>
      hasCustomContent ? (
        children
      ) : (
        <Content className={className} contentVariant={isAlternativeVariant}>
          {header && (
            <FormHeaderContainer>
              <FormHeader>
                <FormHeaderLabel>
                  <Medium>{header}</Medium>
                </FormHeaderLabel>
              </FormHeader>
            </FormHeaderContainer>
          )}

          {children}
        </Content>
      ),
    [hasCustomContent, children, className, isAlternativeVariant, header],
  )

  const headerEl = useMemo(
    () => (hasCustomHeader ? hasCustomHeader : <Header hasControls={hasHeaderControls} />),
    [hasCustomHeader, hasHeaderControls],
  )

  return (
    <Wrapper>
      <BodyContainer $isPopup={isPopup} id="main">
        <HeaderWrapper>
          {headerEl}
          {loading && (
            <LoadingContainer>
              <LinearProgress />
            </LoadingContainer>
          )}
        </HeaderWrapper>
        {breadcrumEl}
        {contentEl}
        {footer}
      </BodyContainer>
    </Wrapper>
  )
}

export default Container
