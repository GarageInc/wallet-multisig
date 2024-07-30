import { Box, Typography } from '@material-ui/core'
import TouchAppIcon from '@material-ui/icons/TouchApp'
import cx from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'

import Copy from '../../../components/Copy/Copy'
import styles from './SeedPad.module.scss'

interface IProps {
  words: string[]
  onSeedShown: () => void
  showSeed: boolean | null
}

const SeedPad = ({ words, onSeedShown, showSeed }: IProps) => {
  const [show, setShow] = useState(showSeed)

  const onPadClick = useCallback(() => {
    setShow(true)
    if (!showSeed) onSeedShown()
  }, [onSeedShown, showSeed])

  useEffect(() => {
    if (showSeed) {
      setShow(true)
    }
  }, [showSeed])

  return (
    <>
      {show ? (
        <div className={cx(styles.padContainer, styles.padContainerShow)} role="button" tabIndex={0}>
          <Box p={2}>
            <Typography className={styles.padWords}>{words.join(' ')}</Typography>
            <Copy text={words.join(' ')} iconStyle={{ color: '#868686' }} />
          </Box>
        </div>
      ) : (
        <div className={styles.padContainer} role="button" tabIndex={0} onKeyDown={onPadClick} onClick={onPadClick}>
          <TouchAppIcon size={35} />
          <Box style={{ width: 180, marginTop: 12 }}>
            <Typography className={styles.padTitle}>Click here to reveal secret seed</Typography>
          </Box>
        </div>
      )}
    </>
  )
}

export default SeedPad
