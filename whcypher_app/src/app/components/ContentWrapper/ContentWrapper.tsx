import { Box } from '@material-ui/core'
import cx from 'classnames'
import React from 'react'

import NeedHelp from '../NeedHelp/NeedHelp'
import PageHeader from '../PageHeader/PageHeader'
import { SContainer } from './styleds'

interface IProps {
  title?: string
  goBack?: () => void
  children: React.ReactNode
  noFooter?: boolean
  className?: string
  goBackDisabled?: boolean
}

const ContentWrapper = ({ title, goBackDisabled, goBack, children, noFooter = false, className = '' }: IProps) => (
  <>
    <Box padding="16px 24px 20px 24px">
      <PageHeader title={title} goBack={goBack} goBackDisabled={goBackDisabled} />
    </Box>
    <SContainer className={cx(className)}>{children}</SContainer>
    {!noFooter && <NeedHelp />}
  </>
)

export default ContentWrapper
