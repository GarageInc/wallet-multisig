import { Button } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'src/serviceWorker/app/store/store'

import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import * as steps from '../../../constants/appInitSteps'
import {
  closeSnackBar,
  setAppInitPassword,
  setCurrentStep,
  setPrevSteps,
  setSnackBarError,
} from '../../../helpers/backgroundMethods'
import TermsOfUseCheckbox from './../CreatePassword/TermsOfUseCheckbox.component'
import styles from './CreatePassword.module.scss'
import { SContainer, STextInput } from './styled'

interface IProps {
  onNext: () => void
  goBack: () => void
}

const CreatePassword = ({ onNext, goBack }: IProps) => {
  const prevSteps = useSelector((state: AppState) => state.appInit.prevSteps)

  const snackbarOpen = useSelector((state: AppState) => state.snackbar.open)
  const [snackbarTimeout, setSnackbarTimeout] = useState<any>(null)

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    agree: false,
  })

  useEffect(() => {
    if (!snackbarOpen && snackbarTimeout) {
      clearTimeout(snackbarTimeout)
      setSnackbarTimeout(null)

      return () => clearTimeout(snackbarTimeout)
    }
  }, [snackbarOpen, snackbarTimeout])

  const setNextStep = useCallback((nextStep: string) => {
    setCurrentStep(nextStep)
  }, [])

  const setNewPrevSteps = useCallback((newPrevSteps: string[]) => {
    setPrevSteps(newPrevSteps)
  }, [])

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

  const onReadTA = useCallback(() => {
    setNewPrevSteps([...prevSteps, steps.CREATE_PASSWORD])
    setNextStep(steps.TERMS_OF_USE)
  }, [prevSteps, setNewPrevSteps, setNextStep])

  const onAgree = useCallback(() => {
    const { password, confirmPassword, agree } = formData

    if (password.length < 8) {
      setErrorWithTimeout('Password should be at least 8 characters long')
      return
    }
    if (password !== confirmPassword) {
      setErrorWithTimeout("Password doesn't match confirmation")
      return
    }
    if (!agree) {
      setErrorWithTimeout("You can't proceed without terms agreement")
      return
    }

    setAppInitPassword(password, () => {
      onNext()
    })
  }, [formData, onNext, setErrorWithTimeout])

  const handleCheck = useCallback((v: boolean) => setFormData((prev) => ({ ...prev, agree: v })), [])

  return (
    <ContentWrapper title="Create Password" noFooter goBack={() => goBack()}>
      <SContainer>
        <STextInput
          label="New Password (Min 8 chars)"
          onInputChanged={(v) => setFormData({ ...formData, password: v })}
          type="password"
          extraStyles={{ width: '100%' }}
        />

        <STextInput
          label="Confirm Password"
          onInputChanged={(v) => setFormData({ ...formData, confirmPassword: v })}
          type="password"
          extraStyles={{ width: '100%' }}
        />

        <div className={styles.accept}>
          <TermsOfUseCheckbox onReadTA={onReadTA} onCheckChanged={handleCheck} />
        </div>

        <div className={styles.pullRight}>
          <Button fullWidth variant="contained" onClick={() => onAgree()} color="primary">
            Agree
          </Button>
        </div>
      </SContainer>
    </ContentWrapper>
  )
}

export default CreatePassword
