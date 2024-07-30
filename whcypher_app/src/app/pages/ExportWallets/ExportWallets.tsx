/* eslint-disable no-undef */
import { Box, Button, CircularProgress } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import ErrorIcon from '@material-ui/icons/ErrorOutline'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Typography } from 'src/app/componentElements'
import { AlertBlock } from 'src/app/components/AlertBlock/AlertBlock'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import { exportSelectedWallets, setSnackBarSuccess, setSnackBarWarning } from '../../helpers/backgroundMethods'
import { formatAddress } from '../../helpers/formatters'
import styles from './ExportWallets.module.scss'
import NoWallets from './ExportWallets/NoWallets'

const blockchainWallets = (walletsData: IWalletData[], blockchainName: BlockchainNames) =>
  walletsData.filter((wallet) => wallet.blockchain === blockchainName)

const ExportWallets = () => {
  const history = useHistory()

  const activeAccountPubkey = useSelector((state: AppState) => state.application.activeAccountPubkey)
  const walletsData = useSelector((state: AppState) => state.wallets.walletsData)

  const [loading, setLoading] = useState(false)
  const [selectedAll, setSelectedAll] = useState(false)
  const [selectedWallets, setSelectedWallets] = useState<string[]>([])

  const blockchainNames = useMemo(() => {
    return [...new Set(walletsData.reduce((a: BlockchainNames[], c: IWalletData) => [...a, c.blockchain], []))]
  }, [walletsData])

  const onWalletSelectClicked = useCallback(
    (event: any) => {
      if (event.target.checked) {
        setSelectedWallets([...selectedWallets, event.target.name])
      } else {
        setSelectedWallets(selectedWallets.filter((item) => item !== event.target.name))
      }
    },
    [selectedWallets],
  )

  const onSelectAllClicked = useCallback(
    (event: any) => {
      const walletsIds: string[] = []

      blockchainNames.map((blockchainName) =>
        blockchainWallets(walletsData, blockchainName).map((wallet) => walletsIds.push(wallet.walletId)),
      )

      setSelectedAll(!selectedAll)
      setSelectedWallets(walletsIds)
      if (!event.target.checked) {
        setSelectedWallets([])
      }
    },
    [blockchainNames, selectedAll, walletsData],
  )

  const downloadExportFile = useCallback(
    (walletIds: string[], content: any) => {
      const element = document.createElement('a')
      const exportFile = new Blob([content], {
        type: 'text/plain;charset=utf-8',
      })
      element.href = URL.createObjectURL(exportFile)
      const dateMark = new Date().toJSON().slice(0, 10)
      element.download = `wh-backup-${formatAddress(activeAccountPubkey, 4)}-${
        walletIds.length
      }-wallets-${dateMark}.txt`
      document.body.appendChild(element)
      element.click()
    },
    [activeAccountPubkey],
  )

  const exportButton = useCallback(
    (walletIds: string[]) => {
      if (walletIds.length === 0) {
        setSnackBarWarning('No wallets were selected')
        return
      }

      setLoading(true)
      exportSelectedWallets(walletIds, (response: any) => {
        setLoading(false)
        if (!response.error) {
          downloadExportFile(walletIds, response.walletsDataEncrypted)
          setSnackBarSuccess('Backup file downloaded')
        }
      })
    },
    [downloadExportFile],
  )

  return (
    <ContentWrapper title="Export wallets" goBack={() => history.goBack()}>
      <div className={styles.container}>
        <Typography className={styles.subTitle} marginBottom="10px">
          Select wallets that you would like to export.
        </Typography>

        <AlertBlock text="You will need seed phrase to recover wallet backups later." />

        {!blockchainNames.length && <NoWallets />}

        {!!blockchainNames.length && (
          <div style={{ marginRight: -10 }}>
            <div className={styles.selectAllWrapper}>
              <Typography
                style={{
                  fontWeight: 'bold',
                  position: 'absolute',
                  right: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Select all
                <Checkbox
                  name="Select All"
                  value={walletsData}
                  color="default"
                  inputProps={{ 'aria-label': 'checkbox with default color' }}
                  onClick={onSelectAllClicked}
                  checked={selectedAll}
                />
              </Typography>
            </div>
            {blockchainNames.map((blockchainName) => (
              <div key={blockchainName} className={styles.walletsList}>
                <div className={styles.blockchainNameWrapper}>
                  <Typography
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}
                  >
                    {blockchainName}
                  </Typography>
                </div>
                {blockchainWallets(walletsData, blockchainName).map((wallet) => (
                  <div key={wallet.walletId} className={styles.walletEntryWrapper}>
                    <div className={styles.walletInfoWrapper}>
                      <div className={styles.walletNameWrapper}>
                        <Typography style={{ fontSize: 14, fontWeight: 300 }}>{wallet.name}</Typography>
                        {!wallet.isBackup && <ErrorIcon className={styles.errorIcon} />}
                      </div>
                      <div className={styles.walletAddressWrapper}>
                        <Typography
                          style={{
                            fontSize: 11,
                            fontWeight: 300,
                            textTransform: 'uppercase',
                          }}
                        >
                          {formatAddress(wallet.calculatedAddress, 4)}
                        </Typography>
                      </div>
                    </div>
                    <div className={styles.walletCheckboxWrapper}>
                      <Checkbox
                        name={wallet.walletId}
                        value={walletsData}
                        color="default"
                        inputProps={{
                          'aria-label': 'checkbox with default color',
                        }}
                        onClick={onWalletSelectClicked}
                        checked={selectedWallets.includes(wallet.walletId)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {!!blockchainNames.length && (
          <Box mt="16px" mb="16px">
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={() => exportButton(selectedWallets)}
              fullWidth
            >
              {loading && <CircularProgress style={{ color: 'white' }} size={16} />}
              {!loading && 'Export'}
            </Button>
          </Box>
        )}
      </div>
    </ContentWrapper>
  )
}

export default ExportWallets
