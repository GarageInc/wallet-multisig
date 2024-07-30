import { Box, Typography } from '@material-ui/core'
import cx from 'classnames'
import React from 'react'

import Icon from '../../../componentElements/Icon/Icon'
import Copy from '../../../components/Copy/Copy'
import styles from './Pad.module.scss'

interface IProps {
  words: string
  isCorrectPasswordEntered: boolean
}

const Pad = ({ words, isCorrectPasswordEntered }: IProps) => {
  const passIsCorrectAndWordsExists = words && isCorrectPasswordEntered

  return (
    <div
      className={cx(styles.padContainer, {
        [styles.padContainerShow]: passIsCorrectAndWordsExists,
      })}
    >
      {passIsCorrectAndWordsExists && (
        <>
          <Typography className={styles.padWords}>{words}</Typography>
          <Copy text={words} iconStyle={{ color: '#868686' }} />
        </>
      )}

      {!passIsCorrectAndWordsExists && (
        <>
          <Icon icon="lock" size={35} />
          <Box mt={2} style={{ width: 230 }}>
            <Typography className={styles.padTitle}>Enter password to reveal your secret words</Typography>
          </Box>
        </>
      )}
    </div>
  )
}

export default Pad
