import { Box, CircularProgress, Container, LinearProgress, Typography } from '@material-ui/core'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import cx from 'classnames'
import pluralize from 'pluralize'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IJoinedPubKeys, IWalletRequest } from 'src/serviceWorker/app/store/reducers/walletRequestsReducer'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import SecondsCountDown from '../../../components/SecondsCountDown'
import { rejectTransactionSession } from '../../../helpers/backgroundMethods'
import { formatAddress } from '../../../helpers/formatters'
import { createAvatarSvg } from '../../../helpers/publicKeyImageCreator'
import styles from './GroupTransactionSession.module.scss'

const GroupTransactionSession = ({ walletRequest }: { walletRequest: IWalletRequest }) => {
  const activeAccountPubkey = useSelector((state: AppState) => state.application.activeAccountPubkey)
  const walletsData = useSelector((state: AppState) => state.wallets.walletsData)

  const [joinedPubKeys, setJoinedPubKeys] = useState<IJoinedPubKeys>({})
  const [walletData, setWalletData] = useState<IWalletData | undefined>()
  const [pendingPubKeys, setPendingPubKeys] = useState<string[]>([])
  const [approvedPartiesCount, setApprovedPartiesCount] = useState(0)

  useEffect(() => {
    const matchedWalletData = walletsData.find(
      (currentWalletData) => currentWalletData.walletId === walletRequest.walletId,
    )
    setWalletData(matchedWalletData)
  }, [walletsData, walletRequest.walletId])

  useEffect(() => {
    if (walletData) {
      const selectedPendingPubKeys = walletData.participants.filter(
        (partyPubKey: string) => !walletRequest.joinedParties[partyPubKey],
      )
      setPendingPubKeys(selectedPendingPubKeys)

      const newApprovedPartiesCount = Object.values(walletRequest.joinedParties).filter(
        (status) => status == 'pending',
      ).length

      setJoinedPubKeys(walletRequest.joinedParties)
      setApprovedPartiesCount(newApprovedPartiesCount)
    }
  }, [walletData, walletRequest, walletRequest.joinedParties])

  const onCancelClicked = useCallback(() => {
    rejectTransactionSession(walletRequest.sessionId, () => {
      // if ( response.sessionId ) {
      //   What shall we do here?
      //}
    })
  }, [walletRequest])

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.sessionStatus__info}>
          <Typography className={styles.sessionHeader__note}>
            {walletData && (
              <>
                <b>Keep your wallet online</b>{' '}
                {approvedPartiesCount >= walletData.minimumSigAmount && 'just a bit more...'}
                {approvedPartiesCount < walletData.minimumSigAmount && (
                  <>
                    and wait for{' '}
                    <span className={styles.awaitingAmount}>{walletData.minimumSigAmount - approvedPartiesCount}</span>{' '}
                    more {pluralize('confirmation', walletData.minimumSigAmount - approvedPartiesCount)}. Ping other
                    participants directly to speed things up.
                  </>
                )}
              </>
            )}
            {!walletData && <b>Just a moment....</b>}
          </Typography>
        </div>
        <Box>
          <Typography className={styles.stepsInfo}>
            {walletRequest.processStep > 0 && (
              <>
                Step {walletRequest.processStep} of {walletRequest.processSteps}
              </>
            )}
          </Typography>
          <LinearProgress classes={{ root: styles.progressBar }} color="primary" />
        </Box>
        <Box mb={5}>
          <Typography className={styles.countDown}>
            Request will expire in <SecondsCountDown expiresTimestamp={walletRequest.expiresAt} />{' '}
            <a onClick={() => onCancelClicked()} className={styles.cancel}>
              Cancel now
            </a>
          </Typography>
        </Box>

        {walletData &&
          walletData.participants.map((pubKey) => (
            <div key={pubKey} className={styles.participant_wrapper}>
              <div className={styles.walletWrapper}>
                <img
                  alt="avatar"
                  className={styles.avatar}
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(createAvatarSvg(pubKey))}`}
                />
                <Typography className={styles.pubkey}>
                  {activeAccountPubkey === pubKey ? 'You' : formatAddress(pubKey, 6)}
                </Typography>
              </div>

              {walletRequest.initiatorAccountPubKey === pubKey ? (
                <div className={cx(styles.status, styles.joined)}>
                  <span>Requested</span>
                </div>
              ) : (
                <>
                  {joinedPubKeys[pubKey] === 'pending' && (
                    <div className={cx(styles.status, styles.joined)}>
                      <span>Approved</span>
                      <ThumbUpIcon style={{ fontSize: 12, color: '#fff' }} />
                    </div>
                  )}
                  {joinedPubKeys[pubKey] === 'rejected' && (
                    <div className={cx(styles.status, styles.rejected)}>
                      <span>Rejected</span>
                      <ThumbDownIcon style={{ fontSize: 12, color: '#fff' }} />
                    </div>
                  )}
                  {pendingPubKeys.includes(pubKey) && (
                    <div className={cx(styles.status, styles.pending)}>
                      <span>Waiting</span>
                      <CircularProgress style={{ color: 'white' }} size={10} />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
      </Container>
    </div>
  )
}

export default GroupTransactionSession
