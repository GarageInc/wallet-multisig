import { Box, Button, CircularProgress } from '@material-ui/core'
import random from 'random-bigint'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'
import { FlexRow, PrimaryButton, SecondaryButton } from 'src/app/componentElements'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import { USER_REQUEST_TYPES } from 'src/app/constants/requestTypes'
import { AppState } from 'src/serviceWorker/app/store/store'
import { ACCOUNT_MASTER_PATH } from 'src/shared/appConfigs'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import TextInput from '../../components/Form/TextInput/TextInput'
import SessionFailed from '../../components/MultisigSession/SessionFailed/SessionFailed'
import SessionInProgress from '../../components/MultisigSession/SessionInProgress/SessionInProgress'
import SessionSuccess from '../../components/MultisigSession/SessionSuccess/SessionSuccess'
import { WALLET_HOME_PATH } from '../../constants/paths'
import {
  closeSnackBar,
  getMultisigSessionData,
  joinMultisigSession,
  removeRequest,
  resolveMultisigSession,
  setSnackBarError,
} from '../../helpers/backgroundMethods'
import { IPreviewSession } from '../RequestPermission/components/RequestJoinMultisigSession'
import styles from './JoinMultisigSession.module.scss'
import { SBold, SDescription, SRow } from './styleds'

enum Step {
  Form = 'form',
  Preview = 'preview',
  Session = 'session',
}

const JoinMultisigSession = () => {
  const history = useHistory()
  const location = useLocation()

  const [path] = useState(`${ACCOUNT_MASTER_PATH}/0/${random(16)}/${random(16)}`)
  const [sessionId, setSessionId] = useState('')
  const [previewSessionData, setPreviewSessionData] = useState<IPreviewSession>()
  const [requestingData, setRequestingData] = useState(false)
  const [requestingJoin, setRequestingJoin] = useState(false)
  const [step, setStep] = useState<Step>(Step.Form)
  const [requestId, setRequestId] = useState<string>('s')

  const requestsList = useSelector((state: AppState) => state.requests.requestsList)
  const multisigSessions = useSelector((state: AppState) => state.multisigSessions.sessions)
  const activeAccountPubkey = useSelector((state: AppState) => state.application.activeAccountPubkey)

  const sessionData = sessionId ? multisigSessions[sessionId] : ({} as any)

  useEffect(() => {
    const { state: { step = '', sessionId = '' } = {} }: any = location
    if (step && sessionId) {
      setSessionId(sessionId)
      setStep(step)
    }

    const userRequests = requestsList.filter((req) => Object.keys(USER_REQUEST_TYPES).includes(req.requestName))
    if (userRequests.length && userRequests[0].id) {
      setRequestId((prev) => (prev != userRequests[0].id && userRequests[0].id ? userRequests[0].id : prev))
    }
  }, [requestsList, location])

  const onInputChanged = useCallback((k: string, v: string) => {
    if (k === 'sessionId') {
      setSessionId(v)
    }
  }, [])

  const inputError = useCallback((formField: string, fieldValue: string) => {
    if (formField === 'sessionId' && fieldValue.length > 0) {
      if (fieldValue.length !== 24) return 'Invalid session id'
    }
    return ''
  }, [])

  const onBackButton = useCallback(() => {
    if (requestId) removeRequest({ id: requestId })
    history.push(WALLET_HOME_PATH)
  }, [history, requestId])

  const getMultisigDetails = useCallback(() => {
    if (sessionId) {
      setRequestingData(true)
      getMultisigSessionData(sessionId, (sessionData: any) => {
        setRequestingData(false)

        if (!sessionData.error) {
          setStep(Step.Preview)
          setPreviewSessionData(sessionData)
        }
      })
    }
  }, [sessionId])

  const setTimeoutedError = useCallback((message = '', duration = 3000) => {
    setSnackBarError(message)
    setTimeout(() => closeSnackBar(), duration)
  }, [])

  const onJoinButton = useCallback(() => {
    setRequestingJoin(true)

    const isAccountAlreadyJoinedCreationProcess = previewSessionData?.partiesState?.reduce((isJoined, partyState) => {
      return isJoined || (partyState.accountPubKey === activeAccountPubkey && partyState.status == 'pending')
    }, false)

    if (!isAccountAlreadyJoinedCreationProcess) {
      joinMultisigSession(sessionId, path, (response: any) => {
        setRequestingJoin(false)

        if (!response.error) {
          setStep(Step.Session)
          resolveMultisigSession(sessionId)
        }
      })
    } else {
      setRequestingJoin(false)
      setTimeoutedError('This account has already joined. Perhaps it is joined on another device?')
    }
  }, [previewSessionData, path, sessionId, activeAccountPubkey, setTimeoutedError])

  const onCancelButton = useCallback(() => {
    history.push(WALLET_HOME_PATH)
  }, [history])

  return (
    <div className={styles.container}>
      {step === Step.Form && (
        <ContentWrapper noFooter title="Join multisig wallet" goBack={() => onBackButton()}>
          <Medium mt="8px" mb="24px" textAlign="left">
            Once your friend starts a new multisig wallet session, they will send you a session ID.
          </Medium>

          <Medium mb="28px" textAlign="left">
            Enter it below and click “Proceed”.
          </Medium>

          <TextInput
            label="Session ID"
            error={inputError('sessionId', sessionId)}
            placeholder="12e43c...2a3e4f"
            value={sessionId}
            onInputChanged={(e) => onInputChanged('sessionId', e)}
            extraClassNames={styles.input}
            toolTip="Ask your friend to initiate a new multisig wallet and send you the ID of their wallet session"
          />

          <Box mt="28px">
            <Button
              variant="contained"
              color="primary"
              disabled={requestingData}
              onClick={() => getMultisigDetails()}
              fullWidth
            >
              {requestingData ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Proceed'}
            </Button>
          </Box>
        </ContentWrapper>
      )}

      {step === Step.Preview && (
        <ContentWrapper noFooter title="Join multisig wallet" goBack={() => setStep(Step.Form)}>
          <Medium mt="8px" mb="24px" textAlign="left">
            You are about to join multisig wallet
          </Medium>

          {requestingData ? (
            <CircularProgress style={{ color: 'white' }} size={16} />
          ) : (
            <SDescription>
              <SRow>
                <Medium>Blockchain:</Medium>
                <SBold>{previewSessionData?.blockchain}</SBold>
              </SRow>

              <SRow>
                <Medium> Minimum sig. amount:</Medium>
                <SBold>{previewSessionData?.minimumSigAmount}</SBold>
              </SRow>

              <SRow>
                <Medium>Parties amount:</Medium>
                <SBold>{previewSessionData?.partiesAmount}</SBold>
              </SRow>
            </SDescription>
          )}

          <FlexRow gridGap="16px" marginTop="24px">
            <SecondaryButton disabled={requestingJoin} onClick={onCancelButton} fullWidth>
              {requestingJoin ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Cancel'}
            </SecondaryButton>
            <PrimaryButton disabled={requestingJoin} onClick={onJoinButton} fullWidth>
              {requestingJoin ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Join'}
            </PrimaryButton>
          </FlexRow>
        </ContentWrapper>
      )}

      {step === Step.Session && (
        <>
          {sessionData.status === 'pending' && (
            <SessionInProgress onBack={() => history.goBack()} {...{ sessionId, session: sessionData }} />
          )}
          {sessionData.status === 'ready' && (
            <SessionSuccess goBack={onBackButton} {...{ sessionData, session: sessionData }} sessionId={sessionId} />
          )}
          {sessionData.status === 'failed' && <SessionFailed goBack={onBackButton} />}
        </>
      )}
    </div>
  )
}

export default JoinMultisigSession
