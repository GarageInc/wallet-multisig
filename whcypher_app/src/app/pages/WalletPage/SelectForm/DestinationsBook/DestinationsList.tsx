import { Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import { IDestItem } from 'src/serviceWorker/app/store/reducers/knownDestinationsReducer'

import { formatAddress } from '../../../../helpers/formatters'
import styles from './DestinationsList.module.scss'

interface IProps {
  knownDestinations: IDestItem[]

  onDestinationEntryClicked: (d: IDestItem) => void
}

const DestinationsList = ({ knownDestinations, onDestinationEntryClicked }: IProps) => {
  return (
    <div className={styles.container}>
      {knownDestinations.map(({ blockchain, name, address }) => (
        <div
          key={`${blockchain}:${address}`}
          className={styles.elementWrapper}
          onClick={() => onDestinationEntryClicked({ blockchain, name, address })}
        >
          <div className={styles.recordInfoWrapper}>
            <div className={styles.nameWrapper}>
              <Typography className={styles.nameInfo}>{name}</Typography>
            </div>
            <div className={styles.addressWrapper}>
              <Tooltip arrow placement="top" title={address}>
                <Typography className={styles.addressInfo}>{formatAddress(address, 6)}</Typography>
              </Tooltip>
            </div>
          </div>
          <div className={styles.recordInfoWrapper}>
            <Typography className={styles.blockchainInfo}>{blockchain}</Typography>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DestinationsList
