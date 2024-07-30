import { COLORS } from 'src/app/componentElements/Colors'
import Small from 'src/app/componentElements/Typography/Body/Small'
import styled from 'styled-components'

import FlexBox from '../../../FlexBox/FlexBox'
import { Button as BaseButton } from '../../Button'
import { ExpandingButtonProps } from './ExpandingButton.interface'

const ExpandingButton = ({ onClick, Icon, disabled = false, label }: ExpandingButtonProps) => {
  return (
    <Wrapper disabled={disabled} onClick={onClick}>
      <IconWrapper>
        <Icon width={16} height={16} />
      </IconWrapper>
      <FlexBox px={8}>
        <Small>{label}</Small>
      </FlexBox>
    </Wrapper>
  )
}

const Wrapper = styled(BaseButton)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  max-width: 32px;
  overflow: hidden;
  background: ${COLORS.palette.grey};

  &:focus {
    border: 1px solid transparent;
  }

  ${({ disabled }) =>
    !disabled &&
    `
      &:hover {
        transition: max-width 0.3s 0.03s ease-out;
        -webkit-transition: max-width 0.3s 0.03s ease-out;
        cursor: pointer;
        max-width: 200px;
      }
    `};
`

const IconWrapper = styled(FlexBox)`
  justify-content: center;
`

export default ExpandingButton
