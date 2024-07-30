import { useCallback } from 'react'
import { useStore } from 'react-redux'
import DappRequestPermissions from 'src/app/components/DappRequestPermissions/DappRequestPermissions'
import { flushAndClose } from 'src/app/helpers/flushAndClose'
import { useDAppsController } from 'src/app/hooks/uiControllers'
import { useDappMsgChecker, useNoMessagesChecker } from 'src/app/hooks/useDappMsgChecker'
import { AppState } from 'src/serviceWorker/app/store/store'
import { IMessage } from 'src/shared/interfaces/interfaces'

const DappRequestPermissionsPage = () => {
  useDappMsgChecker()

  const { dappMessage: permissionsMessage } = useNoMessagesChecker()

  const dapps = useDAppsController()

  const store = useStore<AppState>()

  const handleConfirm = useCallback(
    async (walletIds: Array<string>) => {
      if (permissionsMessage && walletIds.length) {
        const { chainId, messageId }: IMessage = permissionsMessage
        const addresses = dapps.getConnectedWalletsForBlockchain(chainId, walletIds)

        const state = store.getState()
        const { currentTab } = state.dapps

        dapps.responseToDapp(
          {
            ...permissionsMessage,
            raw: {
              id: permissionsMessage.messageId,
              result: [
                {
                  id: permissionsMessage.messageId,
                  invoker: currentTab.domain,
                  parentCapability: 'eth_accounts',
                  caveats: [
                    {
                      type: 'restrictReturnedAccounts',
                      value: addresses,
                    },
                  ],
                  date: permissionsMessage.time,
                },
              ],
            },
          },
          false,
        )

        dapps.confirmConnection(messageId, addresses)

        await flushAndClose()
      }
    },
    [dapps, permissionsMessage, store],
  )

  return <DappRequestPermissions onConfirm={async (ids) => await handleConfirm(ids)} message={permissionsMessage} />
}

export default DappRequestPermissionsPage
