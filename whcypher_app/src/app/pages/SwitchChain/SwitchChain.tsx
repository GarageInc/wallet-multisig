import { CHAIN_CONFIGS, EthereumFamilyChains } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { ethErrors } from 'eth-rpc-errors'
import { useCallback, useMemo, useState } from 'react'
import { useStore } from 'react-redux'
import { FlexBox } from 'src/app/componentElements'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import DappRequestedTemplate from 'src/app/components/DappRequestedTemplate/DappRequestedTemplate'
import { DappSwitchChain } from 'src/app/components/Header/headers/DappSwitchChain'
import { checkDappAccounts } from 'src/app/helpers/channels'
import { useDAppsController, useDAppsProvidersController } from 'src/app/hooks/uiControllers'
import { useCurrentDappProviderChain } from 'src/app/hooks/useCurrentDappProviderChain'
import { useDappMsgChecker, useNoMessagesChecker } from 'src/app/hooks/useDappMsgChecker'
import { getIChainTypeByNetworkId } from 'src/content/helpers/getIChainTypeByNetworkId'
import { AppState } from 'src/serviceWorker/app/store/store'
import Browser from 'webextension-polyfill'

import { ChainIcon, ChainLine, ChainSwitchIcon, Container, Row } from './styled'

const SwitchChain = () => {
  useDappMsgChecker()

  const { dappMessage } = useNoMessagesChecker()

  const [isRequestInProcess, setRequestInProcess] = useState(false)

  const store = useStore<AppState>()

  const dAppsController = useDAppsController()
  const dappsProvidersController = useDAppsProvidersController()

  const toChain = useMemo(() => {
    try {
      return getIChainTypeByNetworkId(Number.parseInt(dappMessage.raw.params.params[0].chainId)) as EthereumFamilyChains
    } catch {
      return undefined
    }
  }, [dappMessage])

  const fromChain = useCurrentDappProviderChain()

  const onSubmit = useCallback(async () => {
    setRequestInProcess(true)

    if (toChain && fromChain !== toChain) {
      const { currentTab, dappsConnections } = store.getState().dapps

      const activeWallets = dappsConnections[currentTab.id]?.walletIds || []

      if (activeWallets[0]) {
        dAppsController?.addWalletCloneToDappOnBlockchain(activeWallets[0], currentTab.id, toChain)
      }

      dappsProvidersController?.updateEthereumWeb3Provider(toChain)

      checkDappAccounts(dappMessage, toChain)
    } else {
      Browser.runtime.sendMessage(null, {
        messageId: dappMessage?.messageId,
        raw: {
          id: dappMessage?.messageId,
          error: ethErrors.provider.unsupportedMethod(
            'The requested method is not supported by this Ethereum provider.',
          ),
        },
      })
    }

    setRequestInProcess(false)
  }, [dappMessage, fromChain, toChain, dAppsController, dappsProvidersController, store])

  return (
    <DappRequestedTemplate
      onSubmit={onSubmit}
      checkFromAddress={false}
      loading={isRequestInProcess}
      dappMessage={dappMessage}
      header={({ message }) => <DappSwitchChain message={message} />}
    >
      <Container>
        {toChain ? (
          <>
            <FlexBox>
              <Medium>Dapp asks to switch chain</Medium>
            </FlexBox>

            <Row>
              <ChainIcon src={CHAIN_CONFIGS[fromChain].logo} />

              <ChainLine />

              <ChainSwitchIcon />

              <ChainLine />

              <ChainIcon src={CHAIN_CONFIGS[toChain].logo} />
            </Row>
          </>
        ) : (
          <Medium>Dapp asks to use unsupported chain!</Medium>
        )}
      </Container>
    </DappRequestedTemplate>
  )
}

export default SwitchChain
