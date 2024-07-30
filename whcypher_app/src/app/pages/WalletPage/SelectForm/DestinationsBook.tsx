import { Link } from '@material-ui/core'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IDestItem } from 'src/serviceWorker/app/store/reducers/knownDestinationsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import Icon from '../../../componentElements/Icon/Icon'
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import AddNewDestination from './AddNewDestination'
import styles from './DestinationsBook.module.scss'
import DestinationsList from './DestinationsBook/DestinationsList'
import NoDestinations from './DestinationsBook/NoDestinations'

interface IProps {
  goBack: () => void
  blockchain: BlockchainNames
  onSelectDestination: (d: IDestItem) => void
}

const DestinationsBook = ({ blockchain, onSelectDestination, goBack }: IProps) => {
  const [filteredDestinations, setFilteredDestinations] = useState<IDestItem[]>([])
  const [addNewDestination, setAddNewDestination] = useState(false)

  const knownDestinations = useSelector((state: AppState) => state.knownDestinations.list)

  useEffect(() => {
    const _filteredDestinations = knownDestinations.filter(
      (knownDestination) => knownDestination.blockchain === blockchain,
    )

    setFilteredDestinations(_filteredDestinations)
  }, [knownDestinations, blockchain])

  const onAddNewDestinationClicked = useCallback(() => {
    setAddNewDestination(true)
  }, [setAddNewDestination])

  const onAddNewDestinationGoBack = useCallback(() => {
    setAddNewDestination(false)
  }, [setAddNewDestination])

  const onDestinationEntryClicked = useCallback(
    (destinationEntry: IDestItem) => {
      onSelectDestination(destinationEntry)
      goBack()
    },
    [onSelectDestination, goBack],
  )

  return (
    <>
      {!addNewDestination && (
        <ContentWrapper title="Destination book" goBack={goBack}>
          <Link component="button" classes={{ root: styles.link }} onClick={() => onAddNewDestinationClicked()}>
            <Icon icon="add-file" size={16} style={{ marginRight: 5 }} />
            Add new destination
          </Link>

          <hr className={styles.divide} />

          {!filteredDestinations.length && <NoDestinations blockchain={blockchain} />}
          {!!filteredDestinations.length && (
            <DestinationsList
              knownDestinations={filteredDestinations}
              onDestinationEntryClicked={onDestinationEntryClicked}
            />
          )}
        </ContentWrapper>
      )}
      {addNewDestination && <AddNewDestination blockchain={blockchain} goBack={() => onAddNewDestinationGoBack()} />}
    </>
  )
}

export default DestinationsBook
