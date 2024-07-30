import { Box, Typography } from '@material-ui/core'
import React from 'react'

import styles from './NoHosts.module.scss'

const NoHosts = () => (
  <div className={styles.container}>
    <Typography variant="medium" style={{ fontSize: 20 }} classes={{ root: styles.title }}>
      No known hosts yet
    </Typography>

    <Box mt={3}>
      <Typography classes={{ root: styles.info }}>
        Once you will log in to website by using TotalSig a new known host will appear here
      </Typography>
    </Box>
  </div>
)

export default NoHosts
