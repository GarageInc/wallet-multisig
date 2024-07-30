import { Button, CircularProgress } from '@material-ui/core'
import cx from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ContentWrapper from 'src/app/components/ContentWrapper/ContentWrapper'
import { toGrid } from 'src/app/helpers/seed'
import { AppState } from 'src/serviceWorker/app/store/store'
import styled from 'styled-components'

import TextInput from '../../components/Form/TextInput/TextInput'
import { closeSnackBar, setSnackBarError } from '../../helpers/backgroundMethods'
import { importSeed, setEnteredSeedWords } from '../../helpers/backgroundMethods'
import { BodyText } from '../Login/common'
import styles from './ConfirmSeedWords.module.scss'

const SBodyText = styled(BodyText)`
  margin-top: 0px;
`

interface IProps {
  onNext: () => void
  goBack: () => void
}
const ConfirmSeedWords = ({ onNext, goBack }: IProps) => {
  const originalSeedWords = useSelector((state: AppState) => state.appInit.seedWords)
  const enteredSeedWords: any[] = useSelector((state: AppState) => state.appInit.enteredSeedWords)
  const appInitPassword = useSelector((state: AppState) => state.appInit.password)
  const applicationPassword = useSelector((state: AppState) => state.application.password)

  const [sortedSeedWords, SetSortedSeedWords] = useState([])
  const [loading, setLoading] = useState(false)

  // Snack bar related logic can be moved to a mixin
  const snackbarOpen = useSelector((state: AppState) => state.snackbar.open)
  const [snackbarTimeout, setSnackbarTimeout] = useState<any>(null)

  useEffect(() => {
    const itemsList = [...originalSeedWords].sort()
    SetSortedSeedWords(itemsList)
  }, [originalSeedWords])

  useEffect(() => {
    if (!snackbarOpen && snackbarTimeout) {
      clearTimeout(snackbarTimeout)
      setSnackbarTimeout(null)
    }
  }, [snackbarOpen, snackbarTimeout])

  const setErrorWithTimeout = useCallback(
    (message = '', duration = 3000) => {
      if (snackbarTimeout) {
        closeSnackBar()
        clearTimeout(snackbarTimeout)
        setTimeout(() => {
          setSnackBarError(message)
          const newSnackbarTimeout = setTimeout(() => closeSnackBar(), duration)
          setSnackbarTimeout(newSnackbarTimeout)
        }, 200)
      } else {
        setSnackBarError(message)
        const newSnackbarTimeout = setTimeout(() => closeSnackBar(), duration)
        setSnackbarTimeout(newSnackbarTimeout)
      }
    },
    [snackbarTimeout],
  )

  const validateSecret = useCallback(() => {
    if (originalSeedWords.length !== enteredSeedWords.length) return false

    for (let i = 0; i < originalSeedWords.length; i += 1) {
      if (originalSeedWords[i] !== enteredSeedWords[i]) return false
    }

    return true
  }, [enteredSeedWords, originalSeedWords])

  const onContinue = () => {
    setLoading(true)
    if (validateSecret()) {
      const password = appInitPassword || applicationPassword
      importSeed(originalSeedWords.join(' '), password, (response: any) => {
        setLoading(false)
        if (response && response.success) {
          onNext()
        }
      })
    } else {
      setErrorWithTimeout('Entered seed phrase does not match the original!')
      setLoading(false)
    }
  }

  const handleClickRow = (item: any) =>
    !enteredSeedWords.includes(item)
      ? setEnteredSeedWords([...enteredSeedWords, item])
      : setEnteredSeedWords(enteredSeedWords.filter((s) => s !== item))

  return (
    <ContentWrapper title="Confirm Backup of Secret Phrase" goBack={goBack} noFooter>
      <div className={styles.content}>
        <SBodyText text="Please select each word in original order to make sure it is correct" />

        <TextInput
          textArea
          extraClassNames={styles.input}
          rows={3}
          readOnly
          value={enteredSeedWords.join(' ')}
          extraStyles={{ marginBottom: 20 }}
        />

        <div>
          {toGrid(sortedSeedWords).map((row: any) => (
            <div key={row} className={styles.inline}>
              {row.map((item: any, pos: number) => (
                <div
                  role="button"
                  tabIndex={0}
                  key={item}
                  onClick={() => handleClickRow(item)}
                  onKeyDown={() => handleClickRow(item)}
                  className={cx(styles.rowItem, {
                    [styles.rowItemActive]: enteredSeedWords.includes(item),
                  })}
                  style={{
                    marginLeft: pos === 1 ? 6 : 0,
                    marginRight: pos === 1 ? 6 : 0,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={onContinue}
          size="medium"
          disabled={loading}
          fullWidth
          style={{ marginTop: 18 }}
        >
          {loading ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Next'}
        </Button>
      </div>
    </ContentWrapper>
  )
}

export default ConfirmSeedWords
