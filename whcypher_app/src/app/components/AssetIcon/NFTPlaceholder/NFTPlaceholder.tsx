import { memo } from 'react'
import { UnsupportedImage } from 'src/app/componentElements/icons'
import SmallMidGrey from 'src/app/componentElements/Typography/Body/SmallMidGrey'

import { Container, IconWrapper, LabelBox } from './styles'

/**
 * NFT Placeholder Image
 */
const NFTPlaceholder = () => {
  return (
    <Container>
      <IconWrapper>
        <UnsupportedImage />
      </IconWrapper>
      <LabelBox>
        <SmallMidGrey>N/S</SmallMidGrey>
      </LabelBox>
    </Container>
  )
}

export default memo(NFTPlaceholder)
