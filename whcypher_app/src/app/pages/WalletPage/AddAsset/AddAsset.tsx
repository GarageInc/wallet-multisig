import { Box, Button, CircularProgress } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { AddTokenForm } from 'src/app/components/AddTokenForm/AddTokenForm'
import { useAddAssetForm } from 'src/app/hooks/useAddAssetForm'

import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'

const AddAsset = () => {
  const history = useHistory()
  const [walletId, setWalletId] = useState<string | null>(null)

  const goBack = useCallback(() => {
    history.goBack()
  }, [history])

  const { formData, setForm, setLoading, assetAddressPattern, loading, walletData, handleAdd } = useAddAssetForm(
    walletId,
    goBack,
  )

  useEffect(() => {
    const params = new URLSearchParams(history.location.search)
    const walletId = params.get('walletId')

    if (walletId) {
      setWalletId(walletId)

      setLoading(true)
    }
  }, [history.location.search, setLoading])

  return (
    <ContentWrapper title="Add asset" goBack={() => history.goBack()}>
      <AddTokenForm
        formData={formData}
        setForm={setForm}
        assetAddressPattern={assetAddressPattern}
        walletData={walletData}
      />

      <Box mx={2} mt={3}>
        <Button variant="contained" color="primary" disabled={loading} onClick={handleAdd} fullWidth>
          {loading ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Add'}
        </Button>
      </Box>
    </ContentWrapper>
  )
}

export default AddAsset
