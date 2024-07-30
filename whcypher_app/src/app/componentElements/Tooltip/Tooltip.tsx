import { useState } from 'react'
import { usePopper } from 'react-popper'
import Small from 'src/app/componentElements/Typography/Body/Small'
import styled, { css } from 'styled-components'

import Portal from '../Portal/Portal'
import { ITooltip } from './Tooltip.interface'

/**
 * ToolTip Component
 * @constructor
 */
const Tooltip = ({
  placement = 'auto-start',
  title,
  children,

  fullWidth = false,
  noIndents,
  wordBreak = true,
  arrow = true,
  ...props
}: ITooltip) => {
  const [isHovered, setIsHovered] = useState(false)
  // TODO: pass reference object direct to children instead of using wrapper
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLSpanElement | null>()

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
  })

  return (
    <TooltipWrapper>
      <TooltipTarget
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={setReferenceElement}
        $fullWidth={fullWidth}
        $noIndents={noIndents}
      >
        {children}
      </TooltipTarget>
      {isHovered && (
        <Portal id="tooltip">
          <CenterContainer>
            <TooltipBox
              role="tooltip"
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              {...props}
              placement={placement}
              arrow={arrow}
              wordBreak={wordBreak}
            >
              <Small whiteSpace="pre-wrap">{title}</Small>
            </TooltipBox>
          </CenterContainer>
        </Portal>
      )}
    </TooltipWrapper>
  )
}

/**The main wrapper component */
export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
`
/**The Target on which if hovered, the tooltip box will show */
export const TooltipTarget = styled.div<{
  $fullWidth: boolean
  $noIndents?: boolean
}>`
  padding: 5px;
  margin: -1px;
  color: inherit;
  cursor: inherit;
  display: flex;
  ${({ $fullWidth }) => $fullWidth && `width: 100%;`}
  ${({ $noIndents }) =>
    $noIndents &&
    css`
      padding: 0px;
      margin: 0px;
    `}
`

/**Container to center the arrow and on the TooltipTarget */
export const CenterContainer = styled.div`
  position: absolute;
  width: 200px;
  margin-left: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  bottom: calc(100% + 5px);
  pointer-events: none;
  z-index: 9999;
`

/**The container which renders the Tooltip content */
export const TooltipBox = styled.span<{
  placement: ITooltip['placement']
  arrow: boolean
  wordBreak?: boolean
}>`
  z-index: 2;
  position: relative;
  background: black;
  text-align: left;
  border-radius: 5px;
  padding: 12px 16px;
  white-space: pre-wrap;
  box-shadow: 0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3);
  ${({ wordBreak }) =>
    wordBreak &&
    css`
      word-break: break-word;
    `}

  ${({ arrow, placement }) => {
    if (arrow) {
      switch (placement) {
        case 'bottom':
          return css`
            &:after {
              content: '';
              position: absolute;
              width: 1px;
              height: 1px;
              border-width: 5px;
              border-style: solid;
              border-color: transparent transparent black transparent;
              top: unset;
              width: 1px;
              bottom: 100%;
              left: calc(50% - 5px);
            }
          `
        case 'left':
          return css`
            &:after {
              content: '';
              position: absolute;
              width: 1px;
              height: 1px;
              border-width: 5px;
              border-style: solid;
              border-color: transparent transparent transparent black;
              left: 100%;
              top: calc(50% - 5px);
            }
          `
        case 'right':
          return css`
            &:after {
              content: '';
              position: absolute;
              width: 1px;
              height: 1px;
              border-width: 5px;
              border-style: solid;
              border-color: transparent black transparent transparent;
              right: 100%;
              left: unset;
              top: calc(50% - 5px);
            }
          `
        default:
          return `&:after {
            content: '';
            position: absolute;
            width: 1px;
            height: 1px;
            border-width: 5px;
            border-style: solid;
            border-color: black transparent transparent transparent;
            left: calc(50% - 4.5px);
            top: 100%;
          }
      }
    `
      }
    }

    return null
  }}
`

export default Tooltip
