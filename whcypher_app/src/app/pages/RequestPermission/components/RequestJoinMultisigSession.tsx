import { CircularProgress, IconButton, InputLabel, Link, Typography } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { IPartiesState } from 'src/serviceWorker/app/store/reducers/walletRequestsReducer'

import { CHANGE_PATH_PATH } from '../../../constants/paths'
import { getMultisigSessionData } from '../../../helpers/backgroundMethods'
import { IWebPageRequest } from '../RequestPermission/types'
import styles from './RequestJoinMultisigSession.module.scss'

interface IProps {
  webPageRequest: IWebPageRequest
  path: string
}

export interface IPreviewSession {
  blockchain?: BlockchainNames
  minimumSigAmount?: number
  partiesAmount?: number
  address: string
  partiesState?: IPartiesState[]
  joinedSequence: string
}

const RequestJoinMultisigSession = ({ webPageRequest, path }: IProps) => {
  const history = useHistory()

  const { context } = webPageRequest

  const [advanced, setAdvanced] = useState(false)
  const [previewSessionData, setPreviewSessionData] = useState<IPreviewSession>({})
  const [requesting, setRequesting] = useState(true)

  useEffect(() => {
    setRequesting(true)
    getMultisigSessionData(context.sessionId, (sessionData: any) => {
      setRequesting(false)

      if (!sessionData.error) {
        setPreviewSessionData(sessionData)
      } else {
        // handle error
      }
    })
  }, [context.sessionId])

  return (
    <div className={styles.container}>
      <div>
        {requesting ? (
          <CircularProgress style={{ color: 'white' }} size={16} />
        ) : (
          <div className={styles.infoWrapper}>
            <Typography classes={{ root: styles.infoTitle }}>Joined wallet details:</Typography>
            <Typography classes={{ root: styles.infoRow }}>
              Blockchain: <span className={styles.infoVaule}>{previewSessionData.blockchain}</span>
            </Typography>
            <Typography classes={{ root: styles.infoRow }}>
              Minimum sig. amount: <span className={styles.infoVaule}>{previewSessionData.minimumSigAmount}</span>
            </Typography>
            <Typography classes={{ root: styles.infoRow }}>
              Parties amount: <span className={styles.infoVaule}>{previewSessionData.partiesAmount}</span>
            </Typography>
          </div>
        )}

        <div className={styles.advancedArrowWrapper}>
          <Typography className={styles.label}>Advanced</Typography>
          {advanced ? (
            <IconButton onClick={() => setAdvanced(!advanced)} className={styles.arrow}>
              <ArrowDropUpIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setAdvanced(!advanced)} className={styles.arrow}>
              <ArrowDropDownIcon />
            </IconButton>
          )}
        </div>

        {advanced && (
          <>
            <InputLabel className={styles.selectLabel}>Seed to be used (public key)</InputLabel>
            {/* <Input value={fractionPubKey} disabled fullWidth className={styles.input} /> */}
            <div className={styles.pathWrapper}>
              <Typography className={styles.thinLabel}>Path: {path}</Typography>
              {false && (
                <Link component="button" className={styles.link} onClick={() => history.push(CHANGE_PATH_PATH)}>
                  Change path
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RequestJoinMultisigSession
