import { Box, Typography } from '@material-ui/core'
import React from 'react'

import styles from './NoDestinations.module.scss'

const NoDestinations = () => (
  <div className={styles.container}>
    <Typography style={{ fontSize: 20 }} classes={{ root: styles.title }}>
      No entries
    </Typography>
    <Box mt={3}>
      <Typography classes={{ root: styles.info }}>
        Once you add new entries to destination book, they will appear here.
      </Typography>
    </Box>
  </div>
)

export default NoDestinations
