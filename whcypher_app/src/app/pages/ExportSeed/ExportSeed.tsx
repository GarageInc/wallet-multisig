import { Box, Button, TextField } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { Typography } from 'src/app/componentElements'
import { AlertBlock } from 'src/app/components/AlertBlock/AlertBlock'

import { WALLET_HOME_PATH } from '../../constants/paths'
import { getSeedPhrase } from '../../helpers/backgroundMethods'
import styles from './ExportSeed.module.scss'
import Pad from './ExportSeed/Pad'
import { SContentWrapper } from './styled'

const ExportSeed = () => {
  const history = useHistory()

  const [password, setPassword] = useState('')
  const [seed, setSeed] = useState('')
  const [isCorrectPasswordEntered, setIsCorrectPasswordEntered] = useState(false)

  const onBackButton = () => {
    history.push(WALLET_HOME_PATH)
  }

  const onCheckPassword = useCallback(() => {
    getSeedPhrase(password, (result: any) => {
      if (result.seed) {
        setSeed(result.seed)
        setIsCorrectPasswordEntered(true)
      } else {
        setIsCorrectPasswordEntered(false)
      }
      setPassword('')
    })
  }, [password])

  return (
    <SContentWrapper title="Export Seed" goBack={onBackButton}>
      <div className={styles.container}>
        <Typography className={styles.subTitle} marginBottom="16px">
          Your secret backup phrase makes it easy to backup and restore your account.
        </Typography>

        <AlertBlock text="Do not disclose your seed phrase to anyone. You may loose your crypto forever if you do." />

        <Pad words={seed} isCorrectPasswordEntered={isCorrectPasswordEntered} />

        <div className={styles.elField}>
          <div className={styles.elText3}>
            <div>Password</div>
          </div>
          <TextField
            className={styles.passwordField}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>

        <Box mt="16px" mb="16px">
          <Button color="primary" variant="contained" onClick={onCheckPassword} fullWidth>
            Reveal seed
          </Button>
        </Box>
      </div>
    </SContentWrapper>
  )
}

export default ExportSeed
