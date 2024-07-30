import cn from 'classnames'
import { useCallback } from 'react'
import MediumLink from 'src/app/componentElements/Typography/Body/MediumLink'
import styled from 'styled-components'

import { ILink } from './Link.interface'

const Link = ({ to, onClick, children, variant = '', className }: ILink) => {
  const clickHandler = useCallback(() => {
    onClick ? onClick() : window.open(to, '_blank')
  }, [to, onClick])

  return (
    <span onClick={clickHandler} className={cn(variant, className)}>
      <StyledLink>{children}</StyledLink>
    </span>
  )
}

const StyledLink = styled(MediumLink)`
  cursor: pointer;
`

export default Link
