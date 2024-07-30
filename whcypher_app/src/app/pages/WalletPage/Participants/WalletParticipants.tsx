/* eslint-disable no-undef */
import { Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useDappActiveWallet } from 'src/app/hooks/useDappActiveWallet'
import { AppState } from 'src/serviceWorker/app/store/store'

import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import { formatAddress } from '../../../helpers/formatters'
import { createAvatarSvg } from '../../../helpers/publicKeyImageCreator'
import styles from './WalletParticipants.module.scss'

const WalletParticipants = () => {
  const history = useHistory<any>()
  const { walletId } = history.location.state

  const walletData = useDappActiveWallet(walletId)

  const activeAccountPubkey = useSelector((state: AppState) => state.application.activeAccountData.pubKey)

  return (
    <ContentWrapper title="Wallet Information" goBack={() => history.goBack()}>
      <Typography className={styles.section} style={{ marginBottom: 25 }}>
        This multisig wallet requires{' '}
        <span className={styles.sectionCount}>
          {walletData?.minimumSigAmount}
          -of-
          {walletData?.partiesAmount}
        </span>{' '}
        signatures to approve transactions.
      </Typography>

      <h4 className={styles.title}>Participants</h4>
      {walletData?.participants && (
        <div>
          {!!walletData.participants &&
            walletData.participants.map((pubKey) => (
              <div key={pubKey} className={styles.avatarWrapper}>
                <img
                  alt="avatar"
                  className={styles.avatarImage}
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(createAvatarSvg(pubKey))}`}
                />
                <Typography className={styles.avatarLabel}>
                  {activeAccountPubkey === pubKey ? 'You' : formatAddress(pubKey, 6)}
                </Typography>
              </div>
            ))}
        </div>
      )}
    </ContentWrapper>
  )
}

export default WalletParticipants
