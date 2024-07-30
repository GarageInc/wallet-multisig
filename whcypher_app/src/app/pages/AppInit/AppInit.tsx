import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { AppState } from 'src/serviceWorker/app/store/store'

import * as steps from '../../constants/appInitSteps'
import { setBetaWarning, setCurrentStep, setEnteredSeedWords, setPrevSteps } from '../../helpers/backgroundMethods'
import ImportSeed from '../ImportSeed/ImportSeed'
import ConfirmSeedWords from '../NewSeed/ConfirmSeedWords'
import NewSeed from '../NewSeed/NewSeed'
import TermsOfUse from '../TermsOfUse/TermsOfUse'
import Congratulations from './Congratulations'
import CreatePassword from './CreatePassword/CreatePassword'
import NewSeedOrImport from './NewSeedOrImport'
import WelcomePage from './Welcome'

const AppInit = () => {
  const { state: { step } = {} as any }: any = useLocation()

  const currentStep = useSelector((state: AppState) => state.appInit.currentStep)
  const prevSteps: string[] = useSelector((state: AppState) => state.appInit.prevSteps)
  const appInitPath = useSelector((state: AppState) => state.appInit.appInitPath)

  const setNextStep = useCallback((nextStep?: string) => {
    setCurrentStep(nextStep)
  }, [])

  const setNewPrevSteps = useCallback((newPrevSteps: string[]) => {
    setPrevSteps(newPrevSteps)
  }, [])

  return (
    <>
      {currentStep === steps.WELCOME && (
        <WelcomePage
          onNext={() => {
            setNewPrevSteps([...prevSteps, steps.WELCOME])
            setNextStep(steps.NEW_SEED_WORDS_OR_IMPORT)
          }}
        />
      )}
      {currentStep === steps.NEW_SEED_WORDS_OR_IMPORT && (
        <NewSeedOrImport
          onNext={() => {
            setNewPrevSteps([...prevSteps, steps.NEW_SEED_WORDS_OR_IMPORT])
            setNextStep(steps.CREATE_PASSWORD)
          }}
        />
      )}
      {currentStep === steps.CREATE_PASSWORD && (
        <CreatePassword
          onNext={() => {
            setNewPrevSteps([...prevSteps, steps.CREATE_PASSWORD])
            setNextStep(appInitPath)
          }}
          goBack={() => {
            setNextStep(prevSteps.pop())
            setNewPrevSteps([...prevSteps])
          }}
        />
      )}
      {currentStep === steps.NEW_SEED_WORDS && (
        <NewSeed
          onNext={() => {
            setNewPrevSteps([...prevSteps, steps.NEW_SEED_WORDS])
            setNextStep(steps.CONFIRM_SEED_WORDS)
          }}
          goBack={() => {
            setNextStep(prevSteps.pop())
            setNewPrevSteps([...prevSteps])
          }}
          step={step}
        />
      )}
      {currentStep === steps.CONFIRM_SEED_WORDS && (
        <ConfirmSeedWords
          onNext={() => {
            setNewPrevSteps([...prevSteps, steps.CONFIRM_SEED_WORDS])
            setNextStep(steps.CONGRATULATIONS)
            setBetaWarning()
          }}
          goBack={() => {
            setEnteredSeedWords([])
            setNextStep(prevSteps.pop())
            setNewPrevSteps([...prevSteps])
          }}
        />
      )}
      {currentStep === steps.IMPORT_SEED_WORDS && (
        <ImportSeed
          onNext={() => {
            setNewPrevSteps([...prevSteps, steps.IMPORT_SEED_WORDS])
            setNextStep(steps.CONGRATULATIONS)
            setBetaWarning()
          }}
          goBack={() => {
            setNextStep(prevSteps.pop())
            setNewPrevSteps([...prevSteps])
          }}
          step={step}
        />
      )}
      {currentStep === steps.CONGRATULATIONS && <Congratulations step={step} />}
      {currentStep === steps.TERMS_OF_USE && (
        <TermsOfUse
          goBack={() => {
            setNextStep(prevSteps.pop())
            setNewPrevSteps([...prevSteps])
          }}
        />
      )}
    </>
  )
}

export default AppInit
