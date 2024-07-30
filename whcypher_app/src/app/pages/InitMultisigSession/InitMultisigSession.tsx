import { Box, Button, CircularProgress } from '@material-ui/core'
import {
  blockchainList,
  blockchainNames,
  isUnsupportedNetwork,
} from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import pluralize from 'pluralize'
import random from 'random-bigint'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'
import Small from 'src/app/componentElements/Typography/Body/Small'
import { WarningBlock } from 'src/app/components/WarningBlock/WarningBlock'
import { AppState } from 'src/serviceWorker/app/store/store'
import { ACCOUNT_MASTER_PATH } from 'src/shared/appConfigs'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import NumberInput from '../../components/Form/NumberInput/NumberInput'
import SelectInput from '../../components/Form/SelectInput/SelectInput'
import SessionFailed from '../../components/MultisigSession/SessionFailed/SessionFailed'
import SessionInProgress from '../../components/MultisigSession/SessionInProgress/SessionInProgress'
import SessionSuccess from '../../components/MultisigSession/SessionSuccess/SessionSuccess'
import { WALLET_HOME_PATH } from '../../constants/paths'
import { initMultisigSession, removeRequest, resolveMultisigSession } from '../../helpers/backgroundMethods'
import styles from './InitMultisigSession.module.scss'
import { SInputs } from './styled'

type IForm = {
  blockchain: string
  minimumSigAmount: number
  participantsAmount: number
}

const BLOCKCHAINS_OPTIONS = blockchainList
  .filter((item) => !isUnsupportedNetwork(item))
  .map((item) => {
    return {
      id: item,
      name: blockchainNames[item],
    }
  })

const InitMultisigSession = () => {
  const history = useHistory()
  const location = useLocation()

  const [formData, setForm] = useState<IForm>({
    blockchain: BLOCKCHAINS_OPTIONS[0].id,
    minimumSigAmount: 2,
    participantsAmount: 2,
  })

  const [path] = useState(`${ACCOUNT_MASTER_PATH}/0/${random(16)}/${random(16)}`)
  const [sessionId, setSessionId] = useState('')
  const [requesting, setRequesting] = useState(false)
  const [step, setStep] = useState('form')

  const subscriptionPlan = useSelector((state: AppState) => state.subscription.plan)
  const subscriptionLimits = useSelector((state: AppState) => state.subscription.limits)
  const multisigSessions = useSelector((state: AppState) => state.multisigSessions.sessions)

  const sessionData: any = sessionId ? multisigSessions[sessionId] : {}

  useEffect(() => {
    const { state: { step = '', sessionId = '' } = {} }: any = location
    if (step && sessionId) {
      setSessionId(sessionId)
      setStep(step)
    }
  }, [location])

  const onInputChanged = useCallback(
    (k: string, v: any) => {
      if (k === 'minimumSigAmount') {
        const amount = parseInt(v)
        if (amount >= 2 && amount <= 16) setForm({ ...formData, [k]: amount })
      } else if (k === 'participantsAmount') {
        const amount = parseInt(v)
        if (amount >= 2 && amount <= 16) setForm({ ...formData, [k]: amount })
      } else setForm({ ...formData, [k]: v })
    },
    [setForm, formData],
  )

  const inputError = useCallback(
    (formField: string) => {
      // @ts-ignore§
      if (formData[formField] < 2 || formData[formField] > subscriptionLimits.maxPartiesAmount) {
        if (subscriptionPlan == 'FREE') {
          return `Limited to ${subscriptionLimits.maxPartiesAmount} participants`
        } else {
          return `Should be between 2 and ${subscriptionLimits.maxPartiesAmount}`
        }
      }
      if (formField === 'minimumSigAmount') {
        if (formData.minimumSigAmount > formData.participantsAmount) {
          return 'Must be lower or equal than participants count'
        }
      } else if (formField === 'participantsAmount') {
        return ''
      }
      return ''
    },
    [formData, subscriptionLimits, subscriptionPlan],
  )

  const onCreateButton = useCallback(() => {
    setRequesting(true)
    initMultisigSession(
      formData.blockchain,
      formData.minimumSigAmount,
      formData.participantsAmount,
      path,
      (response: any) => {
        setRequesting(false)
        if (response.sessionId) {
          setStep('session')
          setSessionId(response.sessionId)
          resolveMultisigSession(response.sessionId)
        }
      },
    )
  }, [formData, path])

  const onBackButton = useCallback(() => {
    removeRequest({ sessionId }, (response: any) => {
      if (response.success) {
        history.push(WALLET_HOME_PATH)
      }
    })
  }, [history, sessionId])

  return (
    <div className={styles.container}>
      {step === 'form' && (
        <ContentWrapper title="New multisig wallet" goBack={() => history.goBack()}>
          {subscriptionPlan == 'FREE' && (
            <WarningBlock
              text={
                <>
                  <div>
                    With {subscriptionPlan} subscription you can create {subscriptionLimits.vaultsInit}{' '}
                    {pluralize('wallet', subscriptionLimits.vaultsInit)} with max. {subscriptionLimits.maxPartiesAmount}{' '}
                    participants
                  </div>
                </>
              }
            ></WarningBlock>
          )}

          <SInputs>
            <SelectInput
              label="Network"
              value={formData.blockchain}
              list={BLOCKCHAINS_OPTIONS}
              onInputChanged={(v: string) => onInputChanged('blockchain', v)}
              toolTip="Blockchain network in which a new wallet will be generated"
            />

            <NumberInput
              label="Minimum confirmation"
              value={formData.minimumSigAmount}
              onInputChanged={(v: number) => onInputChanged('minimumSigAmount', v)}
              error={inputError('minimumSigAmount')}
              toolTip="Minimum count of wallet participants who jointly can confirm a transaction"
            />

            <NumberInput
              label="Participants count"
              value={formData.participantsAmount}
              onInputChanged={(v: number) => onInputChanged('participantsAmount', v)}
              error={inputError('participantsAmount')}
              toolTip="Total count of wallet participants who can provide their their confirmations on transaction request"
            />
          </SInputs>

          <div className={styles.buttonHint}>
            <Small>
              You will have 5 minutes to complete the session. Please stay online yourself and make sure other
              participants are online.
            </Small>
          </div>

          <Box mt={3}>
            <Button variant="contained" color="primary" disabled={requesting} onClick={onCreateButton} fullWidth>
              {requesting ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Create'}
            </Button>
          </Box>
        </ContentWrapper>
      )}

      {step === 'session' && (
        <>
          {sessionData.status === 'pending' && (
            <SessionInProgress onBack={() => history.goBack()} {...{ sessionId, session: sessionData }} />
          )}
          {sessionData.status === 'ready' && (
            <SessionSuccess goBack={onBackButton} {...{ sessionId, session: sessionData }} sessionId={sessionId} />
          )}
          {sessionData.status === 'failed' && <SessionFailed goBack={onBackButton} />}
        </>
      )}
    </div>
  )
}

export default InitMultisigSession
