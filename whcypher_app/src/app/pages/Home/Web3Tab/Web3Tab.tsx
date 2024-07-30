import {
  BlockchainNames,
  blockchainNames,
  isUnsupportedNetwork,
  ofEthereumFamily,
} from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FlexBox } from 'src/app/componentElements'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import Small from 'src/app/componentElements/Typography/Body/Small'
import ConfirmDialog from 'src/app/components/ConfirmDialog/ConfirmDialog'
import SelectInput from 'src/app/components/Form/SelectInput/SelectInput'
import { makeShortString } from 'src/app/helpers/stringHelper'
import { useDAppsProvidersController } from 'src/app/hooks/uiControllers'
import { useConnectedWeb3AccountsHandlers } from 'src/app/hooks/useConnectedWeb3Accounts'
import { useCurrentDapp } from 'src/app/hooks/useCurrentDapp'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import {
  SAccountsList,
  SContainer,
  SDescription,
  SLabel,
  SLabelSelect,
  SNotConnected,
  SRow,
  SSwitch,
  SWalletsBlock,
  SWalletsBlockInternal,
} from './styled'

const CHAINS_OPTIONS = Object.values(BlockchainNames)
  .filter(ofEthereumFamily)
  .filter((item) => !isUnsupportedNetwork(item))
  .map((item) => {
    return {
      id: item,
      name: blockchainNames[item],
    }
  })

export const Web3Tab = () => {
  const isWeb3Enabled = useSelector((store: AppState) => store.dappsProviders.settings.prioritiseMultisig)

  const controller = useDAppsProvidersController()
  const toggleWeb3 = useCallback(() => {
    controller.setWeb3ProviderInjection(!isWeb3Enabled)
  }, [controller, isWeb3Enabled])

  const dapp = useCurrentDapp()

  const [chain, setChain] = useState<BlockchainNames>()
  const [tmpChain, setTmpChain] = useState<BlockchainNames>()

  const {
    currentTab,
    selectedWallets,
    handleWalletsChange,
    currentChain,
    removeWalletFromDApp,
    selectCurrentDappWallet,
    wallets,
    dappActiveWalletId,
    dAppsController,
  } = useConnectedWeb3AccountsHandlers()

  useEffect(() => {
    setChain(currentChain)
    setTmpChain(currentChain)
  }, [currentChain])

  const [addingWalletData, setAddingWalletData] = useState<IWalletData | undefined>()

  const onChangeWallets = useCallback(
    (walletIds: string[], walletId: string) => {
      const removed = !walletIds.find((w) => w === walletId)

      if (removed) {
        removeWalletFromDApp(walletId)
        handleWalletsChange(walletIds)
      } else {
        const addingWallet = wallets.find((w) => w.walletId === walletId)

        setTmpChain(undefined)
        setAddingWalletData(addingWallet)
      }
    },
    [removeWalletFromDApp, handleWalletsChange, wallets],
  )

  const handleSubmitAddingWallet = useCallback(
    (wallet?: IWalletData, chain?: BlockchainNames) => {
      if (wallet) {
        selectCurrentDappWallet(wallet.walletId, chain)

        handleWalletsChange([wallet?.walletId, ...selectedWallets])
      }

      setAddingWalletData(undefined)
    },
    [selectedWallets, handleWalletsChange, selectCurrentDappWallet],
  )

  const [cloningWallet, setCloningWallet] = useState<IWalletData | undefined>()

  const onApproveCloningNewWallet = useCallback(() => {
    handleSubmitAddingWallet(cloningWallet, tmpChain)
    setCloningWallet(undefined)
  }, [cloningWallet, handleSubmitAddingWallet, tmpChain])

  const handleChainChange = useCallback(
    (chain: string) => {
      const activeWallet = wallets.find((w) => w.walletId === dappActiveWalletId)
      const walletOnNewChain = wallets.find(
        (w) => w.calculatedAddress === activeWallet?.calculatedAddress && w.blockchain === chain,
      )

      if (walletOnNewChain) {
        handleSubmitAddingWallet(walletOnNewChain, walletOnNewChain.blockchain)
      } else {
        setCloningWallet(activeWallet)
      }

      dAppsController.updateAppChain(chain as BlockchainNames)

      setTmpChain(chain as BlockchainNames)
    },
    [dappActiveWalletId, wallets, dAppsController, handleSubmitAddingWallet],
  )

  return (
    <>
      <SContainer>
        <SRow>
          <SLabel>Activate WEB3</SLabel>

          <SSwitch checked={isWeb3Enabled} onChange={toggleWeb3} />
        </SRow>

        <SDescription>Enable Web3 to connect with dApps</SDescription>

        {chain && (
          <SelectInput
            label="Select network"
            value={chain as string}
            list={CHAINS_OPTIONS}
            onInputChanged={handleChainChange}
          />
        )}

        <SWalletsBlock>
          <SWalletsBlockInternal>
            <SLabelSelect>Select wallet</SLabelSelect>

            {dapp && (
              <SAccountsList
                showHeader={false}
                chainId={chain}
                onChange={onChangeWallets}
                selectedWalletIds={selectedWallets}
                dappActiveWalletId={dappActiveWalletId}
              />
            )}
          </SWalletsBlockInternal>

          {!dapp && (
            <SNotConnected>
              <Medium>
                Here you can switch connected wallets once TotalSig is connected to a web3 dApp. To connect a dApp, find
                and click the Connect button on the web3 site.
              </Medium>
            </SNotConnected>
          )}
        </SWalletsBlock>
      </SContainer>

      <ConfirmDialog
        open={!!addingWalletData}
        onClose={() => setAddingWalletData(undefined)}
        onSubmit={() => handleSubmitAddingWallet(addingWalletData, addingWalletData?.blockchain)}
        dialogTitle={currentTab.domain}
        submitLabel="Approve"
      >
        <>
          <Medium>
            Would you like to connect this wallet <b>{addingWalletData?.name}</b> on chain{` `}
            <b>{addingWalletData?.blockchain}</b> and activate it?
          </Medium>
          <FlexBox alignItems="flex-start" justifyContent="space-between" mt="16px" flexDirection="row">
            <FlexBox alignItems="flex-start">
              <Medium overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" fontSize={16} fontWeight={500}>
                {addingWalletData?.name}
              </Medium>
              <Small overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" mt="2px" fontWeight={300}>
                {addingWalletData && makeShortString(addingWalletData.calculatedAddress, 4, 6)}
              </Small>
            </FlexBox>
            <Medium>{addingWalletData?.blockchain}</Medium>
          </FlexBox>
        </>
      </ConfirmDialog>

      <ConfirmDialog
        open={!!cloningWallet}
        onClose={() => onApproveCloningNewWallet()}
        onSubmit={() => onApproveCloningNewWallet()}
        dialogTitle={currentTab.domain}
        submitLabel="I Got It"
        showCancel={false}
      >
        <>
          <Medium>
            You don&apos;t have wallet {cloningWallet?.name} on {tmpChain} chain
          </Medium>
          <FlexBox alignItems="flex-start" justifyContent="space-between" mt="16px" flexDirection="row">
            <FlexBox alignItems="flex-start">
              <Medium>We will create a new wallet for you on {tmpChain} chain</Medium>
            </FlexBox>
          </FlexBox>
        </>
      </ConfirmDialog>
    </>
  )
}
