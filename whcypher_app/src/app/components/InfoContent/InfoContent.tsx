import { memo } from 'react'
import FlexBox from 'src/app/componentElements/FlexBox/FlexBox'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import styled from 'styled-components'

import InfoRow from './InfoRow'

const config: {
  checked: boolean
  description: string
}[] = [
  {
    checked: true,
    description: 'See address, account balance and activity ',
  },
  {
    checked: true,
    description: 'Suggest transactions to approve',
  },
]

/**
 * Information Content
 */
const InfoContent = () => {
  return (
    <Container>
      <LabelBox>Allow this site to:</LabelBox>
      {config.map(({ checked, description }, index) => (
        <InfoRow
          key={index}
          checked={checked}
          description={`${description}`}
          hasDivider={index !== config.length - 1}
        />
      ))}
    </Container>
  )
}

const Container = styled(FlexBox)`
  margin: 8px 20px 0 22px;
`

const LabelBox = styled(Medium)`
  margin-bottom: 21px;
  font-size: 16px;
  font-weight: 500;
`

export default memo(InfoContent)
