import { IconButton, Typography } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { AppState } from 'src/serviceWorker/app/store/store'

import Icon from '../../componentElements/Icon/Icon'
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import { deleteKnownHost } from '../../helpers/backgroundMethods'
import { formatHost } from '../../helpers/formatters'
import styles from './KnownHosts.module.scss'
import NoHosts from './KnownHosts/NoHosts'

interface IHost {
  host: string
}

const KnownHosts = () => {
  const history = useHistory()

  const [loading, setLoading] = useState(false)

  const knownHostsList = useSelector((state: AppState) => state.knownHosts.list)

  const onDeleteClick = useCallback((knownHost: IHost) => {
    setLoading(true)
    deleteKnownHost(knownHost.host, () => {
      setLoading(false)
    })
  }, [])

  return (
    <ContentWrapper title="Known Hosts" goBack={() => history.goBack()}>
      {!knownHostsList.length && <NoHosts />}
      {!!knownHostsList.length &&
        knownHostsList.map((knownHost) => (
          <div className={styles.host} key={knownHost.host}>
            <Typography style={{ fontWeight: 300 }} className={styles.walletName}>
              {formatHost(knownHost.host)}
            </Typography>
            <IconButton className={styles.button} disabled={loading} onClick={() => onDeleteClick(knownHost)}>
              <Icon icon="close" size={12} />
            </IconButton>
          </div>
        ))}
    </ContentWrapper>
  )
}

export default KnownHosts
