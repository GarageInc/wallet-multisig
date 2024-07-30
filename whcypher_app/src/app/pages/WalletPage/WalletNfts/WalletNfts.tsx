/* eslint-disable no-undef */
import { Button, CircularProgress, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'
import { isNft } from 'src/serviceWorker/app/utils/assetTypes'

import Icon from '../../../componentElements/Icon/Icon'
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import { WALLET_SEND_FORM_PATH } from '../../../constants/paths'
import { getAvailableERC721, updateWalletBalances } from '../../../helpers/backgroundMethods'
import { nftURL } from '../../../helpers/links'
import styles from './WalletNfts.module.scss'

interface IAssetData {
  type: string
  assetId: string
  name: string
  ticker: string
}

interface INftOption {
  id: string
  imageURL: string
  description: string
  name: string
  metadata: string
}

const WalletNfts = () => {
  const history = useHistory<any>()
  const { walletId, assetId } = history.location.state

  const walletsData = useSelector((state: AppState) => state.wallets.walletsData)
  const [walletData, setWalletData] = useState<IWalletData | undefined>({} as IWalletData)

  const [assetData, setAssetData] = useState<IAssetData>({} as IAssetData)
  const [selectNTFOptions, setSelectNFTOptions] = useState<INftOption[]>([])
  const [loading, setLoading] = useState(false)

  const [activeTokenId, setActiveTokenId] = useState<string | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const refreshBalances = useCallback(() => {
    setLoading(true)
    updateWalletBalances(walletId, () => {
      setLoading(false)
    })
  }, [walletId])

  useEffect(() => {
    if (walletId) {
      const walletData = walletsData.find((data) => data.walletId === walletId)
      setWalletData(walletData)
    }
  }, [walletId, walletsData])

  useEffect(() => {
    if (walletData && Object.keys(walletData).length > 0) {
      if (walletData.balances) {
        let newAssetData: IAssetData = {} as IAssetData
        walletData.balances.forEach((data) => {
          if (data.assetId === assetId) {
            newAssetData = data
          }
        })

        setAssetData(newAssetData)
      } else {
        refreshBalances()
      }
    }
  }, [walletData, assetId, refreshBalances])

  useEffect(() => {
    if (isNft(assetData.type)) {
      setLoading(true)
      getAvailableERC721(walletId, assetData.assetId, (response: any) => {
        if (response.assets) {
          setSelectNFTOptions(response.assets)
          setLoading(false)
        }
      })
    }
  }, [assetData.assetId, assetData.type, walletId])

  useEffect(() => {
    if (activeTokenId) {
      const activeToken = selectNTFOptions.find((nftToken) => nftToken.id === activeTokenId)

      if (activeToken) {
        const img = new Image()
        img.src = activeToken.imageURL
        img.onload = () => {
          setImageSrc(activeToken.imageURL)
        }
      } else {
        setImageSrc(null)
      }
    } else {
      setImageSrc(null)
    }
  }, [activeTokenId, selectNTFOptions])

  const switchActiveToken = useCallback(
    (newActiveTokenId: string) => {
      if (activeTokenId === newActiveTokenId) {
        setActiveTokenId(null)
      } else {
        setActiveTokenId(newActiveTokenId)
        setImageSrc('loading')
      }
    },
    [activeTokenId],
  )

  const openSendFormPage = useCallback(
    (walletId: string, assetId: string, value: string) => {
      history.push({
        pathname: WALLET_SEND_FORM_PATH,
        search: `?walletId=${walletId}&assetId=${assetId}&value=${value}`,
      })
    },
    [history],
  )

  return (
    <ContentWrapper title="NFTs list" goBack={() => history.goBack()}>
      {Object.keys(assetData).length > 0 && (
        <>
          <h4 className={styles.title}>
            Your {assetData.name} ({assetData.ticker}) tokens
          </h4>

          {loading && (
            <div className={styles.loadingWrapper}>
              <CircularProgress size={32} />
            </div>
          )}

          {!loading &&
            selectNTFOptions.map((nftToken) => (
              <div key={nftToken.id} className={styles.tokenWrapper}>
                <div className={styles.tokenHeaderWrapper} onClick={() => switchActiveToken(nftToken.id)}>
                  <div className={styles.tokenNameWrapper}>
                    <Typography className={styles.tokenName}>{nftToken.name}</Typography>
                    <Typography className={styles.tokenID}>Token ID #{nftToken.id}</Typography>
                  </div>
                  {activeTokenId === nftToken.id ? (
                    <Icon icon="chevron-bottom" size={12} style={{ transform: 'rotate(180deg)' }} />
                  ) : (
                    <Icon icon="chevron-bottom" size={12} />
                  )}
                </div>
                {activeTokenId === nftToken.id && (
                  <>
                    <div className={styles.metaDataWrapper}>
                      {!nftToken.metadata && (
                        <div className={styles.missingMetaData}>NFT&apos;s meta data is not available</div>
                      )}
                      {nftToken.metadata && (
                        <div className={styles.metaData}>
                          {imageSrc && (
                            <>
                              {imageSrc === 'loading' && (
                                <div className={styles.imageLoadingWrapper}>
                                  <div className={styles.loadingWrapper}>
                                    <CircularProgress size={32} />
                                  </div>
                                </div>
                              )}
                              {imageSrc !== 'loading' && <img src={imageSrc}></img>}
                            </>
                          )}
                          {!imageSrc && (
                            <div className={styles.imageLoadingWrapper}>
                              <div className={styles.loadingWrapper}>Image not available</div>
                            </div>
                          )}
                          <div className={styles.description}>{nftToken.description}</div>
                        </div>
                      )}
                    </div>

                    <div className={styles.inline} style={{ paddingTop: 15 }}>
                      <div style={{ width: '100%', paddingRight: 10 }}>
                        {walletData && (
                          <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            style={{ color: '#fff' }}
                            target="_blank"
                            href={nftURL(walletData.blockchain, assetData.assetId, nftToken.id)}
                          >
                            See in explorer
                          </Button>
                        )}
                      </div>
                      <div style={{ width: '100%', paddingLeft: 10 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={() => openSendFormPage(walletId, assetData.assetId, nftToken.id)}
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
        </>
      )}
    </ContentWrapper>
  )
}

export default WalletNfts
