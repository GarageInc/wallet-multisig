import { memo } from 'react'
import FlexBox from 'src/app/componentElements/FlexBox/FlexBox'
import { CheckIcon, CrossIcon } from 'src/app/componentElements/icons'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import styled from 'styled-components'

export interface IInfoRow {
  checked: boolean
  description: string
  hasDivider: boolean
}

const Container = styled(FlexBox).attrs({
  flexDirection: 'row',
})<{ $hasDivider: boolean }>`
  margin-bottom: 16px;
  align-items: flex-start;

  &:last-child {
    margin: 0;
  }
`

/**
 * Info Row with checked & description
 */
const InfoRow = ({ checked, description, hasDivider }: IInfoRow) => (
  <Container $hasDivider={hasDivider}>
    {checked ? (
      <FlexBox mt="6px">
        <CheckIcon width={10} height={10} />
      </FlexBox>
    ) : (
      <FlexBox mt="6px">
        <CrossIcon width={10} height={10} />
      </FlexBox>
    )}
    <FlexBox justifyContent="center" ml={11}>
      <Medium fontWeight={400} textAlign="left">
        {description}
      </Medium>
    </FlexBox>
  </Container>
)

export default memo(InfoRow)
