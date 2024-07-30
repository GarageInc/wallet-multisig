import { Button, CircularProgress, IconButton, Link, Typography } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { CHAIN_ADAPTERS } from '@whalesheaven/chain-service/src/helpers/adapters'
import cx from 'classnames'
import pluralize from 'pluralize'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { SignMessageView } from 'src/app/components/SignMessageView/SignMessageView'
import { IWalletRequest } from 'src/serviceWorker/app/store/reducers/walletRequestsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'
import { isNft } from 'src/serviceWorker/app/utils/assetTypes'

import Copy from '../../../components/Copy/Copy'
import SecondsCountDown from '../../../components/SecondsCountDown'
import {
  cancelAutoApproval,
  getAvailableERC721,
  joinTransactionSession,
  rejectTransactionSession,
  resolveTransactionSession,
} from '../../../helpers/backgroundMethods'
import { formatAddress, formatCurrency, sigFigs } from '../../../helpers/formatters'
import { addressURL } from '../../../helpers/links'
import { createAvatarSvg } from '../../../helpers/publicKeyImageCreator'
import styles from './GroupTransactionRequest.module.scss'

interface INftData {
  imageURL: string
  description: string
  name: string
  metadata: string
}

const coinSendCostMessage = (walletRequest: IWalletRequest) => {
  const sendCostMessage = `${sigFigs(walletRequest.value + walletRequest.networkFee, 5)} ${formatCurrency(
    walletRequest.ticker,
  )}`

  return sendCostMessage
}

const tokenSendCostMessage = (walletRequest: IWalletRequest) => {
  let sendCostMessage = `${sigFigs(walletRequest.value, 5)} ${formatCurrency(walletRequest.ticker)}`

  if (typeof walletRequest.networkFee === 'number' && walletRequest.networkFee > 0) {
    sendCostMessage += ` + ${sigFigs(walletRequest.networkFee, 5)} ${formatCurrency(walletRequest.networkFeeTicker)}`
  }

  return sendCostMessage
}

const nftSendCostMessage = (walletRequest: IWalletRequest) => {
  let sendCostMessage = `#${walletRequest.value} ${formatCurrency(walletRequest.ticker)}`
  sendCostMessage += ` + ${sigFigs(walletRequest.networkFee, 5)} ${formatCurrency(walletRequest.networkFeeTicker)}`

  return sendCostMessage
}

const GroupTransactionRequest = ({
  walletRequest,
  goBack,
}: {
  walletRequest: IWalletRequest
  goBack: (w: IWalletRequest) => void
}) => {
  const rates = useSelector((state: AppState) => state.currencyRates.rates)

  const [requestInProcess, setRequestInProcess] = useState(false)
  const [autoApprovalFrame, setAutoApproval] = useState(true)

  const [nftDataPanelOpen, setNftDataPanelOpen] = useState(false)
  const [nftDataLoading, setNftDataLoading] = useState(false)
  const [nftData, setNftData] = useState<INftData>({} as INftData)
  const [nftImageSrc, setNftImageSrc] = useState<string | null>(null)

  const joinedPartiesCount = useMemo(
    () => Object.values(walletRequest.joinedParties).filter((status: string) => status == 'pending').length,
    [walletRequest],
  )

  useEffect(() => {
    if (isNft(walletRequest.assetType)) {
      setNftDataLoading(true)
      getAvailableERC721(walletRequest.walletId, walletRequest.assetId, (response: any) => {
        if (response.assets) {
          const activeNFTData = response.assets.find((nftData: any) => nftData.id === walletRequest.value)

          if (activeNFTData) {
            setNftData(activeNFTData)
            setNftImageSrc('loading')
          }

          setNftDataLoading(false)
        }
      })
    }
  }, [walletRequest.assetId, walletRequest.assetType, walletRequest.value, walletRequest.walletId])

  useEffect(() => {
    if (nftData) {
      const img = new Image()
      img.src = nftData.imageURL
      img.onload = () => {
        setNftImageSrc(nftData.imageURL)
      }
    } else {
      setNftImageSrc(null)
    }
  }, [nftData])

  const getRate = useCallback(
    (value: number, ticker: string) => {
      if (rates[ticker]) {
        return `${sigFigs(rates[ticker] * value, 4)} USD` // change to rate[coinData.assetId]
      }
      return ''
    },
    [rates],
  )

  const toggleTokenDataPanel = useCallback(() => {
    setNftDataPanelOpen(!nftDataPanelOpen)
  }, [nftDataPanelOpen])

  const onApprove = useCallback(({ walletId, sessionId }: { walletId: string; sessionId: string }) => {
    setRequestInProcess(true)
    joinTransactionSession(walletId, sessionId, (response: any) => {
      setRequestInProcess(false)
      if (!response.error) {
        resolveTransactionSession(sessionId, false)
      }
    })
  }, [])

  const onReject = useCallback(
    (walletRequest: IWalletRequest) => {
      setRequestInProcess(true)
      rejectTransactionSession(walletRequest.sessionId, (response: any) => {
        setRequestInProcess(false)
        if (!response.error) {
          goBack(walletRequest)
        }
      })
    },
    [goBack],
  )

  const onAutoApprovalCancelClick = useCallback((sessionId: string) => {
    setRequestInProcess(true)
    cancelAutoApproval(sessionId, (response: any) => {
      setRequestInProcess(false)
      setAutoApproval(false)

      resolveTransactionSession(response.transactionData.sessionId)
    })
  }, [])

  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <img
          alt="avatar"
          className={styles.avatarIcon}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(createAvatarSvg(walletRequest.initiatorAccountPubKey))}`}
        />
        <Typography className={styles.titleHeader}>
          <span className={styles.requester}>{formatAddress(walletRequest.initiatorAccountPubKey, 5)}</span>
          <span> is asking you to confirm:</span>
        </Typography>
      </div>

      <div className={styles.dataWrapper}>
        <div className={styles.inlineData}>
          <Typography className={styles.fieldText}>Blockchain</Typography>
          <div>
            <Typography className={styles.fieldValue}>{walletRequest.blockchain}</Typography>
          </div>
        </div>

        {walletRequest.destination && (
          <div className={styles.inlineData}>
            <Typography className={styles.fieldText}>Destination</Typography>
            <div className={styles.data}>
              <Typography className={styles.fieldValue}>{formatAddress(walletRequest.destination, 5)}</Typography>
              <Copy text={walletRequest.destination} iconButtonStyle={{ margin: 0, marginRight: '-6px' }} />
              <Link
                classes={{ root: styles.iconButton }}
                target="_blank"
                href={addressURL(walletRequest.blockchain, walletRequest.destination)}
              >
                <OpenInNewIcon classes={{ root: styles.icon }} />
              </Link>
            </div>
          </div>
        )}

        {isNft(walletRequest.assetType) && (
          <>
            <div className={styles.inlineData}>
              <Typography className={styles.fieldText}>Token ID</Typography>
              <div className={styles.tokenValueWrapper}>
                <Typography className={styles.fieldValue}>{walletRequest.value}</Typography>
                <IconButton className={styles.iconButton} onClick={() => toggleTokenDataPanel()}>
                  <ArrowDropDownIcon classes={{ root: styles.icon }} />
                </IconButton>
              </div>
            </div>
            {nftDataPanelOpen && (
              <div className={styles.nftDataWrapper}>
                {nftDataLoading && (
                  <div className={styles.loadingWrapper}>
                    <div className={styles.loadingWrapper2}>
                      <CircularProgress size={32} />
                    </div>
                  </div>
                )}
                {!nftDataLoading && (
                  <>
                    {!nftData.metadata && (
                      <div className={styles.missingMetaData}>NFT&apos;s meta data is not available</div>
                    )}
                    {nftData.metadata && (
                      <div className={styles.metaData}>
                        <Typography className={styles.nftName}>{nftData.name}</Typography>
                        {nftImageSrc && (
                          <>
                            {nftImageSrc === 'loading' && (
                              <div className={styles.loadingWrapper2}>
                                <CircularProgress size={32} />
                              </div>
                            )}
                            {nftImageSrc !== 'loading' && <img src={nftImageSrc}></img>}
                          </>
                        )}
                        {!nftImageSrc && (
                          <div className={styles.imageLoadingWrapper}>
                            <div className={styles.loadingWrapper}>Image not available</div>
                          </div>
                        )}
                        <div className={styles.description}>{nftData.description}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </>
        )}
        {!isNft(walletRequest.assetType) &&
          walletRequest.assetType !== CHAIN_ADAPTERS.RAW_SIGNATURE &&
          walletRequest.assetType !== CHAIN_ADAPTERS.EVM_SMART_CONTRACT && (
            <div className={styles.inlineData}>
              <Typography className={styles.fieldText}>Amount</Typography>
              <div>
                <Typography className={styles.fieldValue}>
                  {sigFigs(walletRequest.value, 5)} {formatCurrency(walletRequest.ticker)}
                </Typography>
                <div>
                  <Typography className={styles.currencyRate}>
                    {getRate(walletRequest.value, walletRequest.ticker)}
                  </Typography>
                </div>
              </div>
            </div>
          )}

        {walletRequest.assetType !== CHAIN_ADAPTERS.RAW_SIGNATURE && (
          <div className={styles.inlineData}>
            <Typography className={styles.fieldText}>Network fees</Typography>
            <div>
              <Typography className={styles.fieldValue}>
                {walletRequest.networkFee === 0 && 'Free'}
                {walletRequest.networkFee > 0 && (
                  <>
                    {sigFigs(walletRequest.networkFee, 5)} {formatCurrency(walletRequest.networkFeeTicker)}
                  </>
                )}
              </Typography>
              <div>
                <Typography className={styles.currencyRate}>
                  {getRate(walletRequest.networkFee, walletRequest.networkFeeTicker)}
                </Typography>
              </div>
            </div>
          </div>
        )}
      </div>

      {walletRequest.assetType === CHAIN_ADAPTERS.RAW_SIGNATURE && (
        <div className={cx(styles.total)}>
          <Typography style={{ fontWeight: 500 }} className={styles.fieldText}>
            Sign Request
          </Typography>

          {walletRequest.rawData && <SignMessageView signInMsg={walletRequest.rawData} />}
        </div>
      )}
      {walletRequest.assetType !== CHAIN_ADAPTERS.RAW_SIGNATURE && (
        <div className={cx(styles.inlineData, styles.total)}>
          <Typography style={{ fontWeight: 500 }} className={styles.fieldText}>
            Total
          </Typography>
          <div>
            <Typography className={styles.fieldValue}>
              {walletRequest.ticker === walletRequest.networkFeeTicker && coinSendCostMessage(walletRequest)}
              {walletRequest.ticker !== walletRequest.networkFeeTicker && (
                <>
                  {!isNft(walletRequest.assetType) && tokenSendCostMessage(walletRequest)}
                  {isNft(walletRequest.assetType) && nftSendCostMessage(walletRequest)}
                </>
              )}
            </Typography>
            <div>
              <Typography className={styles.currencyRate}>
                {getRate(walletRequest.networkFee, walletRequest.networkFeeTicker)}
              </Typography>
            </div>
          </div>
        </div>
      )}

      {walletRequest.startAutoApproving && autoApprovalFrame ? (
        <div>
          <Typography>
            Auto approve after <SecondsCountDown expiresTimestamp={walletRequest.autoApproveAt} />
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => onAutoApprovalCancelClick(walletRequest.sessionId)}
          >
            {requestInProcess ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Cancel'}
          </Button>
        </div>
      ) : (
        <div className={styles.inline} style={{ paddingTop: 15 }}>
          <div style={{ width: '100%', paddingRight: 10 }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ color: '#fff' }}
              onClick={() => onReject(walletRequest)}
            >
              {requestInProcess ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Reject'}
            </Button>
          </div>
          <div style={{ width: '100%', paddingLeft: 10 }}>
            <Button variant="contained" color="primary" fullWidth onClick={() => onApprove(walletRequest)}>
              {requestInProcess ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Approve'}
            </Button>
          </div>
        </div>
      )}

      <div className={styles.joinCount}>
        <Typography style={{ fontSize: 12 }} className={styles.fieldText}>
          {joinedPartiesCount} {pluralize('party', joinedPartiesCount)} has joined
        </Typography>
      </div>
    </div>
  )
}

export default GroupTransactionRequest
