import { Box, Button, CircularProgress } from '@material-ui/core'
import { blockchainList } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { DISTINATION_NAME_REGEXP } from 'src/app/constants/destination'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import SelectInput from '../../components/Form/SelectInput/SelectInput'
import TextInput from '../../components/Form/TextInput/TextInput'
import { DESTINATIONS_BOOK_PATH } from '../../constants/paths'
import { addKnownDestination, getBlockchainMetaInfo } from '../../helpers/backgroundMethods'
import styles from './AddNewDestination.module.scss'

const AddNewDestination = () => {
  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [destinationPattern, setDestinationPattern] = useState(new RegExp('.*'))
  const [form, setForm] = useState({
    name: '',
    blockchain: blockchainList[0],
    address: '',
  })

  const updateBlockchainAddressPattern = useCallback((blockchain: string) => {
    getBlockchainMetaInfo(blockchain, (response: any) => {
      setDestinationPattern(new RegExp(response.destinationPattern))
    })
  }, [])

  useEffect(() => {
    updateBlockchainAddressPattern(blockchainList[0])
  }, [updateBlockchainAddressPattern])

  const onInputChanged = useCallback((k: string, v: string) => {
    setForm((form) => ({ ...form, [k]: v }))
  }, [])

  const onBlockchainSelectChanged = useCallback(
    (k: string, v: string) => {
      onInputChanged(k, v)
      updateBlockchainAddressPattern(v)
    },
    [onInputChanged, updateBlockchainAddressPattern],
  )

  const onFormSubmit = useCallback(() => {
    // TODO add destination pattern check
    setLoading(true)
    addKnownDestination(form.blockchain, form.address, form.name, (response: any) => {
      setLoading(false)
      if (!response.error) {
        history.push({ pathname: `${DESTINATIONS_BOOK_PATH}` })
      }
    })
  }, [form.address, form.blockchain, form.name, history])

  return (
    <ContentWrapper title="Add new destination" goBack={() => history.goBack()}>
      <TextInput
        label="Destination name"
        value={form.name}
        onInputChanged={(e) => onInputChanged('name', e)}
        error={form.name.length > 0 && !DISTINATION_NAME_REGEXP.test(form.name) ? 'Destination name is invalid' : ''}
        extraClassNames={styles.input}
        toolTip="Name of entry in destination book"
      />

      <SelectInput
        label="Destination network"
        value={form.blockchain}
        list={blockchainList}
        extraClassNames={styles.input}
        onInputChanged={(v) => onBlockchainSelectChanged('blockchain', v)}
        toolTip="Destination network in which wallet exists"
      />

      <TextInput
        label="Destination wallet"
        value={form.address}
        onInputChanged={(e) => onInputChanged('address', e)}
        error={form.address.length > 0 && !destinationPattern.test(form.address) ? 'Destination wallet is invalid' : ''}
        extraClassNames={styles.input}
        toolTip="Wallet of entry in destination book"
      />

      <Box mx={2}>
        <Button variant="contained" disabled={loading} color="primary" onClick={onFormSubmit} fullWidth>
          {loading ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Add new'}
        </Button>
      </Box>
    </ContentWrapper>
  )
}

export default AddNewDestination
