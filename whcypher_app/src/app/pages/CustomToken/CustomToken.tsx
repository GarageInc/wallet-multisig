import { useCallback, useMemo } from 'react'
import { AddTokenForm } from 'src/app/components/AddTokenForm/AddTokenForm'
import DappRequestedTemplate from 'src/app/components/DappRequestedTemplate/DappRequestedTemplate'
import { WatchAssetHeader } from 'src/app/components/Header/headers/WatchAssetHeader'
import { flushAndClose } from 'src/app/helpers/flushAndClose'
import { IWatchAssetForm, useAddAssetForm } from 'src/app/hooks/useAddAssetForm'
import { useDappActiveWallet } from 'src/app/hooks/useDappActiveWallet'
import { useDappMsgChecker, useNoMessagesChecker } from 'src/app/hooks/useDappMsgChecker'

import { Container } from './styled'

const CustomToken = () => {
  useDappMsgChecker()

  const { dappMessage } = useNoMessagesChecker()

  const defaultValues = useMemo<IWatchAssetForm | undefined>(() => {
    if (dappMessage && dappMessage.raw.params.params.options) {
      const { symbol, decimals, address, image } = dappMessage.raw.params.params.options

      return {
        assetAddress: address,
        name: symbol,
        ticker: symbol,
        decimals,
        image,
        chainId: dappMessage.chainId,
      }
    }

    return undefined
  }, [dappMessage])

  const wallet = useDappActiveWallet()

  const onEnd = useCallback(async () => {
    await flushAndClose()
  }, [])

  const { formData, setForm, assetAddressPattern, loading, walletData, handleAdd } = useAddAssetForm(
    wallet?.walletId,
    onEnd,
    defaultValues,
  )

  if (dappMessage) {
    return (
      <DappRequestedTemplate
        onSubmit={handleAdd}
        confirmLabel="Confirm"
        loading={loading}
        checkFromAddress={false}
        closeOnEnd={true}
        dappMessage={dappMessage}
        header={({ message }) => <WatchAssetHeader message={message} />}
        disabled={!formData.assetAddress}
      >
        <Container>
          <AddTokenForm
            formData={formData}
            setForm={setForm}
            walletData={walletData}
            assetAddressPattern={assetAddressPattern}
          />
        </Container>
      </DappRequestedTemplate>
    )
  }

  return (
    <Container>
      <span>No pending dApps requests.</span>
    </Container>
  )
}

export default CustomToken
