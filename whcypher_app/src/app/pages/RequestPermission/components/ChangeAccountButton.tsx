import { Link as MaterialLink } from '@material-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { CHANGE_ACCOUNT_PATH } from '../../../constants/paths'
import styles from './ChangeAccountButton.module.scss'

const ChangeAccountButton = () => {
  return (
    <MaterialLink component={RouterLink} to={CHANGE_ACCOUNT_PATH} classes={{ root: styles.button }}>
      Change account
    </MaterialLink>
  )
}

export default ChangeAccountButton
