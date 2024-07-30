import FlexBox from 'src/app/componentElements/FlexBox/FlexBox'
import styled from 'styled-components'

export const Wrapper = styled(FlexBox).attrs({
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
})`
  width: 100%;
`

export const Item = styled(FlexBox).attrs({
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
})`
  width: 24px;
  height: 16px;
`

export const Circle = styled.div<{ instance: number }>`
  background: #ffffff;
  border-radius: 50%;
  width: 8px;
  height: 8px;

  ${({ instance }) =>
    `
    animation: fill 1s linear infinite;
    animation-delay: ${instance * 250}ms;
  `};

  @keyframes fill {
    0% {
      width: 8px;
      height: 8px;
    }

    50% {
      width: 16px;
      height: 16px;
    }

    100% {
      width: 8px;
      height: 8px;
    }
  }
`

export const Loader = () => {
  return (
    <Wrapper>
      <Item>
        <Circle instance={1} />
      </Item>
      <Item>
        <Circle instance={2} />
      </Item>
      <Item>
        <Circle instance={3} />
      </Item>
    </Wrapper>
  )
}
