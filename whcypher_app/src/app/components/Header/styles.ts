import { ellipsis } from 'polished'
import { FlexBox, Link } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const Content = styled(FlexBox).attrs({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
})``

export const Logo = styled.img`
  border-radius: 4px;
`

export const DomainLink = styled(Link)`
  ${ellipsis()}

  div {
    color: ${COLORS.palette.dark};
  }
`

export const Domain = styled(FlexBox)`
  border-radius: 20px;
  text-align: left;
  background: ${COLORS.palette.lightBlue};
  border: 1px solid ${COLORS.palette.bluelishGrey};
  padding: 8px 38px;
`
