import { Typography } from '@material-ui/core'
import React from 'react'

import styles from './NoWallets.module.scss'

const NoWallets = () => (
  <div className={styles.container}>
    <div className={styles.headerWrapper}>
      <Typography className={styles.header}>No wallets yet, nothing to export</Typography>
    </div>
  </div>
)

export default NoWallets
