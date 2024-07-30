import { Tooltip } from '@material-ui/core'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { COLORS } from '../../componentElements/Colors'
import Icon from '../../componentElements/Icon/Icon'
import { SIconButton } from './styled'

const styles = {
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0',
  },
}

const TooltipWrapper = ({ text, children }: { text: string; children: any }) => {
  if (text && text !== '') {
    return (
      <Tooltip arrow placement="bottom" title={text}>
        {children}
      </Tooltip>
    )
  } else {
    return children
  }
}

const Copy = ({
  text,
  iconButtonStyle = {},
  iconStyle,
  className,
  toolTip,
}: {
  className?: string
  iconStyle?: any
  toolTip?: string
  text: string
  iconButtonStyle?: any
}) => (
  <TooltipWrapper text={toolTip || text}>
    <CopyToClipboard text={text}>
      <SIconButton
        style={{ ...styles.icon, ...iconButtonStyle }}
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        <Icon icon="copy" color={COLORS.palette.darkGrey} size={12} style={{ ...iconStyle }} />
      </SIconButton>
    </CopyToClipboard>
  </TooltipWrapper>
)

export default Copy
