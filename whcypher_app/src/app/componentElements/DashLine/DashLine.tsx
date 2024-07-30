import styled, { css } from 'styled-components'

import { IDashLine } from './DashLine.interface'

const DashLine = ({ vertical = false, className, divider }: IDashLine) => {
  return <Line $vertical={vertical} $divider={divider} className={className} />
}

const Line = styled.div<{ $vertical: boolean; $divider?: boolean }>`
  ${({ $vertical }) =>
    $vertical
      ? css`
          height: 100%;
          width: 1px;
          background-image: linear-gradient(to right, black 25%, rgba(255, 255, 255, 0) 0%);

          background-position: top;
          background-size: 1px 4px;
          background-repeat: repeat-y;
        `
      : css`
          width: 100%;
          height: 1px;
          flex: none;
          background-image: linear-gradient(to right, black 25%, rgba(255, 255, 255, 0) 0%);
          background-position: left;
          background-size: 4px 1px;
          background-repeat: repeat-x;
        `}

  ${({ $divider, theme }) =>
    $divider &&
    css`
      width: 110px;
      background-image: linear-gradient(to right, white 25%, rgba(white, 0) 0%);
    `}
`
export default DashLine
