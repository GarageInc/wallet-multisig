import { Box, Button, CircularProgress, Link, Tooltip, Typography } from '@material-ui/core'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { DISTINATION_NAME_REGEXP } from 'src/app/constants/destination'
import { AppState } from 'src/serviceWorker/app/store/store'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import TextInput from '../../components/Form/TextInput/TextInput'
import { updateKnownDestinationName } from '../../helpers/backgroundMethods'
import { formatAddress } from '../../helpers/formatters'
import { addressURL } from '../../helpers/links'
import styles from './EditDestinationName.module.scss'

const EditDestinationName = () => {
  const history = useHistory()
  const location = useLocation()

  const { state: { blockchain, address } = {} as any }: any = location

  const [loading, setLoading] = useState(false)
  const [newName, setNewName] = useState('')

  const knownDestinations = useSelector((state: AppState) => state.knownDestinations.list)

  useEffect(() => {
    const knownDestination = knownDestinations.find(
      (knownDestination) => knownDestination.blockchain == blockchain && knownDestination.address == address,
    )

    knownDestination && setNewName(knownDestination.name)
  }, [knownDestinations, address, blockchain])

  const onFormSubmit = () => {
    // TODO add destination pattern check
    setLoading(true)
    updateKnownDestinationName(blockchain, address, newName, (response: any) => {
      setLoading(false)
      if (!response.error) {
        history.goBack()
      }
    })
  }

  return (
    <ContentWrapper title="Edit destination" goBack={() => history.goBack()}>
      <div className={styles.container}>
        <TextInput
          label="Destination name"
          value={newName}
          onInputChanged={(e) => setNewName(e)}
          error={setNewName.length > 0 && !DISTINATION_NAME_REGEXP.test(newName) ? 'Destination name is invalid' : ''}
          extraClassNames={styles.input}
          toolTip="Name of entry in destination book"
        />

        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <Typography className={styles.label}>Destination network:</Typography>
            <span>{blockchain}</span>
          </div>

          <div className={styles.info}>
            <Typography className={styles.label}>Destination wallet:</Typography>
            <span className={styles.fieldWithIcons}>
              <Tooltip arrow placement="top" title={address}>
                <span>{formatAddress(address, 6)}</span>
              </Tooltip>
              <Link classes={{ root: styles.iconButton }} target="_blank" href={addressURL(blockchain, address)}>
                <OpenInNewIcon classes={{ root: styles.icon }} />
              </Link>
            </span>
          </div>
        </div>

        <Box mx={2} mt={3}>
          <Button variant="contained" disabled={loading} color="primary" onClick={onFormSubmit} fullWidth>
            {loading ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Update'}
          </Button>
        </Box>
      </div>
    </ContentWrapper>
  )
}

export default EditDestinationName
