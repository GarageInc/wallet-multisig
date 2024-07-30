import { EVM_CHAINS } from '@whalesheaven/chain-service/src/helpers/chain-types'
import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { AppState } from 'src/serviceWorker/app/store/store'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import CustomURLView from './CustomURLView'

export const DEFAULT_RPC = {
  rpc: '',
}

const EditRpcUrls = () => {
  const history = useHistory()
  const { customRPCUrls } = useSelector((state: AppState) => state.settings)
  const checkForUnexisting = useMemo(() => {
    const data = Object.assign({}, customRPCUrls)
    EVM_CHAINS.forEach((c) => {
      data[c] = DEFAULT_RPC
    })

    return data
  }, [customRPCUrls])

  const goBack = useCallback(() => history.goBack(), [history])

  return (
    <ContentWrapper title="RPC Urls" goBack={goBack}>
      <CustomURLView customURLs={checkForUnexisting} />
    </ContentWrapper>
  )
}

export default EditRpcUrls
