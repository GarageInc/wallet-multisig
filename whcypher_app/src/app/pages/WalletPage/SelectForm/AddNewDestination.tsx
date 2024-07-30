import { Box, Button, CircularProgress } from '@material-ui/core'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import React, { useCallback, useEffect, useState } from 'react'
import { DISTINATION_NAME_REGEXP } from 'src/app/constants/destination'

import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import TextInput from '../../../components/Form/TextInput/TextInput'
import { addKnownDestination, getBlockchainMetaInfo } from '../../../helpers/backgroundMethods'
import styles from './AddNewDestination.module.scss'

interface IProps {
  goBack: () => void
  blockchain: BlockchainNames
}

const AddNewDestination = ({ blockchain, goBack }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [destinationPattern, setDestinationPattern] = useState(new RegExp('.*'))
  const [form, setForm] = useState({
    name: '',
    address: '',
  })

  useEffect(() => {
    updateBlockchainAddressPattern(blockchain)
  }, [blockchain])

  const onInputChanged = useCallback((k: string, v: string) => {
    setForm((form) => ({ ...form, [k]: v }))
  }, [])

  const onFormSubmit = () => {
    // TODO add destination pattern check
    setLoading(true)
    addKnownDestination(blockchain, form.address, form.name, (response: any) => {
      setLoading(false)
      if (!response.error) {
        goBack()
      }
    })
  }

  const updateBlockchainAddressPattern = (blockchain: BlockchainNames) => {
    getBlockchainMetaInfo(blockchain, (response: any) => {
      setDestinationPattern(new RegExp(response.destinationPattern))
    })
  }

  return (
    <ContentWrapper title="Add new destination" goBack={goBack}>
      <TextInput
        label="Destination name"
        value={form.name}
        onInputChanged={(e) => onInputChanged('name', e)}
        error={form.name.length > 0 && !DISTINATION_NAME_REGEXP.test(form.name) ? 'Destination name is invalid' : ''}
        extraClassNames={styles.input}
        toolTip="Name of entry in destination book"
      />

      <TextInput
        label="Destination network"
        value={blockchain}
        disabled={true}
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
