import { Link } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { AppState } from 'src/serviceWorker/app/store/store'

import Icon from '../../componentElements/Icon/Icon'
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import { ADD_NEW_ADDRESS_PATH } from '../../constants/paths'
import styles from './DestinationsBook.module.scss'
import DestinationsList from './DestinationsBook/DestinationsList'
import NoDestinations from './DestinationsBook/NoDestinations'

const DestinationsBook = () => {
  const history = useHistory()

  const knownDestinations = useSelector((state: AppState) => state.knownDestinations.list)

  return (
    <ContentWrapper title="Destination book" goBack={() => history.goBack()}>
      <Link component="button" classes={{ root: styles.link }} onClick={() => history.push(ADD_NEW_ADDRESS_PATH)}>
        <Icon icon="add-file" size={16} style={{ marginRight: 5 }} />
        Add new destination
      </Link>

      <hr className={styles.divide} />

      {!knownDestinations.length && <NoDestinations />}
      {!!knownDestinations.length && <DestinationsList knownDestinations={knownDestinations} />}
    </ContentWrapper>
  )
}

export default DestinationsBook
