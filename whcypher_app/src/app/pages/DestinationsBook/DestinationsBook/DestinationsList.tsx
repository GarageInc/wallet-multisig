import { IconButton, Tooltip, Typography } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { IDestItem } from 'src/serviceWorker/app/store/reducers/knownDestinationsReducer'

import Copy from '../../../components/Copy/Copy'
import { EDIT_DESTINATION_NAME_PATH } from '../../../constants/paths'
import { deleteKnownDestination } from '../../../helpers/backgroundMethods'
import { formatAddress } from '../../../helpers/formatters'
import styles from './DestinationsList.module.scss'

const DestinationsList = ({ knownDestinations }: { knownDestinations: IDestItem[] }) => {
  const history = useHistory()

  const [loading, setLoading] = useState(false)

  const onRemoveItem = useCallback((blockchain: BlockchainNames, address: string) => {
    setLoading(true)
    deleteKnownDestination(blockchain, address, () => {
      setLoading(false)
    })
  }, [])

  const onEditRecord = useCallback(
    (blockchain: BlockchainNames, address: string) => {
      history.push({
        pathname: `${EDIT_DESTINATION_NAME_PATH}`,
        state: {
          blockchain,
          address,
        },
      })
    },
    [history],
  )

  return (
    <div className={styles.container}>
      {knownDestinations.map(({ blockchain, name, address }) => (
        <div key={`${blockchain}:${address}`} className={styles.elementWrapper}>
          <div className={styles.recordInfoWrapper}>
            <div className={styles.nameWrapper}>
              <Typography className={styles.nameInfo}>{name}</Typography>
              <IconButton className={styles.editRecordNameButton} onClick={() => onEditRecord(blockchain, address)}>
                <EditIcon className={styles.editRecordNameIcon} />
              </IconButton>
            </div>
            <div className={styles.addressWrapper}>
              <Tooltip arrow placement="top" title={address}>
                <Typography className={styles.addressInfo}>{formatAddress(address, 6)}</Typography>
              </Tooltip>
              <Copy text={address} iconStyle={{ color: '#868686' }} />
            </div>
          </div>
          <div className={styles.recordInfoWrapper}>
            <Typography className={styles.blockchainInfo}>{blockchain}</Typography>
          </div>
          <IconButton className={styles.button} disabled={loading} onClick={() => onRemoveItem(blockchain, address)}>
            <DeleteForeverIcon />
          </IconButton>
        </div>
      ))}
    </div>
  )
}

export default DestinationsList
