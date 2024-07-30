import { memo } from 'react'
import { FlexRow } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import FlexBox from 'src/app/componentElements/FlexBox/FlexBox'
import Small from 'src/app/componentElements/Typography/Body/Small'

import { IFooter } from './Footer.interface'
import { ButtonApprove, ButtonCancel, Container, SInfoIcon } from './styles'

/**
 * EXT Connect Footer
 */
const Footer = ({ onSubmit, onCancel, disabledSubmit, submitLabel, showTrust = true }: IFooter) => {
  return (
    <Container mt="auto">
      {showTrust && (
        <FlexBox flexDirection="row" alignItems="center" justifyContent="center" mb={16}>
          <FlexRow>
            <SInfoIcon color={COLORS.palette.blue} />
            <Small fontWeight={400}>Only connect with websites you trust.</Small>
          </FlexRow>
        </FlexBox>
      )}
      <FlexBox flexDirection="row" alignItems="center">
        <ButtonCancel onClick={onCancel}>Cancel</ButtonCancel>

        <FlexBox width={16} />

        <ButtonApprove onClick={onSubmit} disabled={disabledSubmit}>
          {submitLabel}
        </ButtonApprove>
      </FlexBox>
    </Container>
  )
}

export default memo(Footer)
