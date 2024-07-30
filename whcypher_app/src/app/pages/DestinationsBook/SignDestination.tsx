import { Button } from '@material-ui/core'
import { blockchainList } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'

import SelectInput from '../../components/Form/SelectInput/SelectInput'
import TextInput from '../../components/Form/TextInput/TextInput'
import Header from '../../components/PageHeader/PageHeader'
import { WALLET_HOME_PATH } from '../../constants/paths'
import { signAddress } from '../../helpers/backgroundMethods'
import styles from './SignDestination.module.scss'

const SignDestination = () => {
  const history = useHistory()
  const [data, setData] = useState({ network: blockchainList[0], address: '' })

  const onInputChanged = useCallback((k: any, v: any) => {
    setData((data) => ({ ...data, [k]: v }))
  }, [])

  return (
    <div className={styles.container}>
      <Header title="Sign new address" goBack={() => history.goBack()} />

      <SelectInput
        label="Network"
        value={data.network}
        list={blockchainList}
        onInputChanged={(v) => onInputChanged('network', v)}
        toolTip="Blockchain network in which signing address exists"
      />

      <TextInput
        label="Address"
        value={data.address}
        onInputChanged={(e) => onInputChanged('address', e)}
        placeholder="Account 1"
      />

      <div style={{ textAlign: 'left' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            signAddress(data)
            history.push({ pathname: `${WALLET_HOME_PATH}`, search: '?activity=2' })
          }}
        >
          Sign
        </Button>
      </div>
    </div>
  )
}

export default SignDestination
