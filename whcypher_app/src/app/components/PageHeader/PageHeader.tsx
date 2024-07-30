import React from 'react'
import { IconBack } from 'src/app/componentElements/icons'

import { SBox, SContainer, STitle } from './styles'

interface IProps {
  title?: string
  style?: React.CSSProperties
  goBack?: () => void
  goBackDisabled?: boolean
}

const PageHeader = ({ title, style, goBack, goBackDisabled }: IProps) => (
  <SContainer style={{ ...style }}>
    {goBack && (
      <SBox onClick={!goBackDisabled ? goBack : undefined}>
        {!goBackDisabled && <IconBack />}
        {goBackDisabled && <IconBack />}
      </SBox>
    )}
    {title && <STitle>{title}</STitle>}
  </SContainer>
)

export default PageHeader
