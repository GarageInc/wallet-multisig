import { memo } from 'react'
import Small from 'src/app/componentElements/Typography/Body/Small'

import NFTPlaceholder from './NFTPlaceholder/NFTPlaceholder'
import { Container, Image, Text, Video } from './styles'
import { useAssetIcon, UseAssetIconRes } from './useAssetIcon'
import { isVideoFile } from 'src/app/helpers/media'

export interface AssetIconProps {
  icons?: (string | null)[] // available icons including alternatives when fail
  symbol?: string
  className?: string
  isNFT?: boolean
}

type ContentProps = Pick<AssetIconProps, 'symbol' | 'isNFT'> & UseAssetIconRes

const Content = ({ symbol, icon, handleImageError, isNFT = false }: ContentProps) => {
  if (icon) {
    if (isVideoFile(icon)) {
      return (
        <Video
          controlsList="nodownload nofullscreen"
          src={icon}
          autoPlay
          playsInline
          loop
          muted
          onError={handleImageError}
        />
      )
    }
    return <Image src={icon} alt="Icon" onError={handleImageError} />
  }
  if (isNFT) {
    return <NFTPlaceholder />
  }
  return (
    <Text>
      <Small>{symbol?.substr(0, 3)}</Small>
    </Text>
  )
}

const _AssetIcon = ({ icons, symbol, className, isNFT }: AssetIconProps) => {
  const { icon, handleImageError } = useAssetIcon(icons)

  return (
    <Container className={className}>
      <Content icon={icon} symbol={symbol} handleImageError={handleImageError} isNFT={isNFT} />
    </Container>
  )
}

export const AssetIcon = memo(_AssetIcon)
