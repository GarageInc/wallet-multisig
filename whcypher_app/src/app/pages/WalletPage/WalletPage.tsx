import { CircularProgress, Tooltip } from '@material-ui/core'
import { CHAIN_ADAPTERS } from '@whalesheaven/chain-service/src/helpers/adapters'
import { isEqual } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link, Typography } from 'src/app/componentElements'
import { PlusIcon } from 'src/app/componentElements/icons'
import { AlertBlock } from 'src/app/components/AlertBlock/AlertBlock'
import { filterRequestsByTypeAndPubKey } from 'src/app/helpers/requestUtils'
import { AppState } from 'src/serviceWorker/app/store/store'
import { isNft } from 'src/serviceWorker/app/utils/assetTypes'

import NeedHelp from '../../components/NeedHelp/NeedHelp'
import { ADD_ASSET_PATH, WALLET_MISSING_BACKUP_PATH, WALLET_NFT_PATH } from '../../constants/paths'
import { WALLET_REQUEST_TYPES } from '../../constants/requestTypes'
import { getWalletMetaInfo, updateWalletBalances } from '../../helpers/backgroundMethods'
import { formatAssetType, sigFigsLimitedCents } from '../../helpers/formatters'
import { assetURL } from '../../helpers/links'
import {
  SAsset,
  SCard,
  SCenter,
  SContainer,
  SContent,
  SImageSearchIcon,
  SLabelLink,
  SLine,
  SLineTokens,
  SName,
  SOpenInNewIcon,
  SRow,
  SSubName,
  STokenType,
} from './styleds'
import WalletHeader from './WalletHeader/WalletHeader'

const addRequestsToWalletsData = (walletsData: any, requestsList: any[], pubKey: string) =>
  walletsData.map((walletData: any, index: number) => {
    const walletDataWithRequest = { ...walletData, requests: [], index }
    filterRequestsByTypeAndPubKey(requestsList, WALLET_REQUEST_TYPES, pubKey).forEach((request: any) => {
      if (
        walletDataWithRequest.blockchain === request.blockchain &&
        walletDataWithRequest.calculatedAddress === request.from
      ) {
        walletDataWithRequest.requests.push(request)
      }
    })
    return walletDataWithRequest
  })

const WalletPage = () => {
  const history = useHistory()

  const walletsData: any[] = useSelector((state: AppState) => state.wallets.walletsData)
  const requestsList = useSelector((state: AppState) => state.walletRequests.requestsList)
  const activeAccountPubkey = useSelector((state: AppState) => state.application.activeAccountPubkey)
  const rates: any = useSelector((state: AppState) => state.currencyRates.rates)

  const [walletId, setWalletId] = useState<string | null>(null)
  const [walletDataWithRequests, setWalletDataWithRequests] = useState<any>({})
  const [coin, setCoin] = useState<any>({})
  const [supportedBlockchainAssets, setSupportedBlockchainAssets] = useState<any[]>([])
  const [assetsPresent, setAssetsPresent] = useState<boolean>(false)
  const [assetsList, setAssetsList] = useState<any>({})
  const [balances, setBalances] = useState<any[]>([{ assetId: '', balance: '...' }])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const params = new URLSearchParams(history.location.search)
    const walletId = params.get('walletId')

    if (walletId) {
      setWalletId(walletId)
    } else {
      const blockchain = params.get('blockchain')
      const walletAddress = params.get('walletAddress')

      const walletData = walletsData.find(
        (data) => data.blockchain === blockchain && data.calculatedAddress === walletAddress,
      )
      if (walletData) setWalletId(walletData.walletId)
    }
  }, [walletsData, history.location.search])

  useEffect(() => {
    if (walletId) {
      getWalletMetaInfo(walletId, ({ supportedAssets }: any) => {
        if (supportedAssets) {
          setSupportedBlockchainAssets(supportedAssets)
        }
      })
    }
  }, [walletId])

  useEffect(() => {
    if (walletId) {
      const walletData = walletsData.find((data) => data.walletId === walletId)

      const walletDataWithRequestsNew = addRequestsToWalletsData([walletData], requestsList, activeAccountPubkey)[0]

      if (!isEqual(walletDataWithRequests, walletDataWithRequestsNew)) {
        setWalletDataWithRequests(walletDataWithRequestsNew)
      }
    }
  }, [walletId, walletsData, activeAccountPubkey, requestsList, walletDataWithRequests])

  const refreshBalances = useCallback(() => {
    setLoading(true)
    updateWalletBalances(walletId, () => {
      setLoading(false)
    })
  }, [walletId])

  useEffect(() => {
    if (Object.keys(walletDataWithRequests).length > 0) {
      if (walletDataWithRequests.balances) {
        setBalances(walletDataWithRequests.balances)
        const coinData = walletDataWithRequests.balances.find((data: any) => data.type === CHAIN_ADAPTERS.COIN)

        const newAssetsList: any = {}
        let newAssetsPresent = false

        walletDataWithRequests.balances.forEach((data: any) => {
          if (data.type !== CHAIN_ADAPTERS.COIN) {
            if (!newAssetsList[data.type]) newAssetsList[data.type] = []
            newAssetsList[data.type].push(data)
            newAssetsPresent = true
          }
        })

        coinData && setCoin(coinData)
        setAssetsList(newAssetsList)
        setAssetsPresent(newAssetsPresent)
      } else {
        refreshBalances()
      }
    }
  }, [walletDataWithRequests, refreshBalances])

  const getBalance = useCallback(
    (assetId = '') => {
      if (loading || assetId === '') return '...'
      const coinData = balances.find((b) => b.assetId === assetId)
      if (coinData) {
        return sigFigsLimitedCents(coinData.balance)
      }
      return '-'
    },
    [balances, loading],
  )

  const getBalanceInBaseCurrency = useCallback(
    (assetId = '') => {
      if (loading || assetId === '') return ''
      const coinData = balances.find((b) => b.assetId === assetId)
      if (rates[coinData.ticker] && coinData) {
        return `${sigFigsLimitedCents(rates[coinData.ticker] * coinData.balance)} USD` // change to rate[coinData.assetId]
      }
      return ''
    },
    [balances, loading, rates],
  )

  const openNFTPage = useCallback(
    (walletId: string, assetId: string) =>
      history.push({
        pathname: WALLET_NFT_PATH,
        state: { walletId, assetId },
      }),
    [history],
  )

  const openBackupPage = useCallback(
    () =>
      history.push({
        pathname: WALLET_MISSING_BACKUP_PATH,
        state: { walletId },
      }),
    [history, walletId],
  )

  const assetNameIsPresent = useCallback((assetName: string, assetTicker: string) => {
    const assetNameMissing = !assetName || assetName === '' || assetName === assetTicker
    return !assetNameMissing
  }, [])

  if (!Object.keys(walletDataWithRequests).length) {
    return <CircularProgress style={{ color: 'white' }} size={56} />
  }

  return (
    <SContainer>
      <WalletHeader walletData={walletDataWithRequests} />

      <SContent>
        {!walletDataWithRequests.isBackup && (
          <AlertBlock
            text={
              <>
                This wallet is missing a backup. To prevent loose of funds{' '}
                <a onClick={() => openBackupPage()}>make a backup now.</a>
              </>
            }
          />
        )}

        <SLine>
          <SLabelLink onClick={refreshBalances}>Refresh</SLabelLink>
        </SLine>

        <SCard>
          <SRow>
            <SName>{assetNameIsPresent(coin.name, coin.ticker) ? coin.name : coin.ticker}</SName>
            <SName>{getBalance(coin.assetId).toLocaleString()}</SName>
          </SRow>

          <SRow>
            <SSubName>{assetNameIsPresent(coin.name, coin.ticker) ? coin.ticker : null}</SSubName>
            <SSubName>{getBalanceInBaseCurrency(coin.assetId).toLocaleString()}</SSubName>
          </SRow>
        </SCard>

        {supportedBlockchainAssets.length > 0 && (
          <>
            <SLineTokens>
              <Typography>TOKENS</Typography>
              <SLabelLink
                onClick={() =>
                  history.push({
                    pathname: ADD_ASSET_PATH,
                    search: `?walletId=${walletId}`,
                  })
                }
              >
                <PlusIcon />
                Add asset
              </SLabelLink>
            </SLineTokens>

            {!assetsPresent && (
              <SCard>
                <SCenter>Your assets will be listed here</SCenter>
              </SCard>
            )}

            {assetsPresent &&
              supportedBlockchainAssets.map((assetType) => (
                <React.Fragment key={assetType}>
                  {assetsList[assetType] && assetsList[assetType].length > 0 && (
                    <SCard>
                      <STokenType>{formatAssetType(walletDataWithRequests.blockchain, assetType)}</STokenType>
                      {assetsList[assetType].map((assetData: any) => (
                        <SAsset key={assetData.assetId}>
                          <SRow>
                            <SName>
                              {assetNameIsPresent(assetData.name, assetData.ticker) ? assetData.name : assetData.ticker}

                              <Tooltip arrow placement="top" title="Open explorer page">
                                <Link
                                  to={assetURL(walletDataWithRequests.blockchain, assetData.assetId, assetData.type)}
                                >
                                  <SOpenInNewIcon />
                                </Link>
                              </Tooltip>
                            </SName>

                            <SName>{getBalance(assetData.assetId).toLocaleString()}</SName>
                          </SRow>

                          <SRow>
                            <SSubName>
                              {assetNameIsPresent(assetData.name, assetData.ticker) && <>{assetData.ticker}</>}

                              {isNft(assetType) && (
                                <Tooltip arrow placement="top" title="See all tokens">
                                  <Link onClick={() => openNFTPage(walletDataWithRequests.walletId, assetData.assetId)}>
                                    <SImageSearchIcon />
                                  </Link>
                                </Tooltip>
                              )}
                            </SSubName>

                            <SSubName>{getBalanceInBaseCurrency(assetData.assetId).toLocaleString()}</SSubName>
                          </SRow>
                        </SAsset>
                      ))}
                    </SCard>
                  )}
                </React.Fragment>
              ))}
          </>
        )}
      </SContent>

      <NeedHelp />
    </SContainer>
  )
}

export default WalletPage
