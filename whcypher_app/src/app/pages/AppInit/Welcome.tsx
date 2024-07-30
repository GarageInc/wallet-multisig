import { Button, Typography } from '@material-ui/core'
import React from 'react'

import styles from './Welcome.module.scss'

interface IProps {
  onNext: () => void
}

const WelcomePage = ({ onNext }: IProps) => {
  const onProceed = () => {
    onNext()
  }

  return (
    <div className={styles.container}>
      <Typography variant="h5" className={styles.title}>
        Welcome to TotalSig
      </Typography>
      <Typography variant="body1" className={styles.subTitle}>
        Multichain multisig wallet application
      </Typography>
      <Button
        variant="contained"
        className={styles.button}
        color="primary"
        size="medium"
        onClick={() => onProceed()}
        fullWidth
      >
        Get Started
      </Button>
    </div>
  )
}

export default WelcomePage
