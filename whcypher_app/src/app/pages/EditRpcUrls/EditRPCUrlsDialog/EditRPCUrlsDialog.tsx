import { yupResolver } from '@hookform/resolvers'
import { CHAIN_CONFIGS } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { isEmpty } from 'lodash'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DashLine, Dialog, FlexBox, InputField, PrimaryButton, SecondaryButton } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import ButtonLabel from 'src/app/componentElements/Typography/Button/ButtonLabel'
import { AssetIcon } from 'src/app/components/AssetIcon/AssetIcon'
import { useChainsController, useNotifications } from 'src/app/hooks/uiControllers'
import { DappChainsResolver } from 'src/serviceWorker/app/models/DappChainsResolver'
import styled from 'styled-components'

import { DEFAULT_RPC } from '../EditRpcUrls'
import { IEditRPCURLDialog } from './EditRPCUrlsDialog.interface'
import schema from './schema'

const EditRPCURLDialog = ({ customURLs, open, handleClose, urlsToRender }: IEditRPCURLDialog) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
  })
  const { dirtyFields, isDirty } = formState
  const chainsController: Readonly<DappChainsResolver> = useChainsController()

  const { addNotification } = useNotifications()
  const onSubmit = async (data: any) => {
    setLoading(true)
    const {
      ethereum = DEFAULT_RPC,
      binancesmartchain = DEFAULT_RPC,
      polygon = DEFAULT_RPC,
      ropsten = DEFAULT_RPC,
      avalanche = DEFAULT_RPC,
      goerli = DEFAULT_RPC,
      arbitrum = DEFAULT_RPC,
    } = customURLs

    // Check if fields have been touched and if the rendered input fields exist in the
    // data object as conditional rendering while selecting chains,
    // dirty all the fields. Then update only the changed fields and rendered fields

    try {
      if (isDirty) {
        const keys = Object.keys(data)
        const result = {
          [BlockchainNames.Ethereum]: {
            rpc:
              dirtyFields?.rpcURLethereummainnet && keys.indexOf('rpcURLethereummainnet') !== -1
                ? data.rpcURLethereummainnet
                : ethereum.rpc,
          },
          [BlockchainNames.BinanceSmartChain]: {
            rpc:
              dirtyFields?.rpcURLbinancesmartchainmainnet && keys.indexOf('rpcURLbinancesmartchainmainnet') !== -1
                ? data.rpcURLbinancesmartchainmainnet
                : binancesmartchain.rpc,
          },
          [BlockchainNames.Polygon]: {
            rpc:
              dirtyFields?.rpcURLpolygonmainnet && keys.indexOf('rpcURLpolygonmainnet') !== -1
                ? data.rpcURLpolygonmainnet
                : polygon.rpc,
          },
          [BlockchainNames.ArbitrumOne]: {
            rpc:
              dirtyFields?.rpcURLarbitrummainnet && keys.indexOf('rpcURLarbitrummainnet') !== -1
                ? data.rpcURLarbitrummainnet
                : arbitrum.rpc,
          },
          [BlockchainNames.Avalanche]: {
            rpc:
              dirtyFields?.rpcURLavalanchemainnet && keys.indexOf('rpcURLavalanchemainnet') !== -1
                ? data.rpcURLavalanchemainnet
                : avalanche.rpc,
          },
          [BlockchainNames.EthereumGoerli]: {
            rpc:
              dirtyFields?.rpcURLgoerlimainnet && keys.indexOf('rpcURLgoerlimainnet') !== -1
                ? data.rpcURLgoerlimainnet
                : goerli.rpc,
          },
          [BlockchainNames.EthereumRopsten]: {
            rpc:
              dirtyFields?.rpcURLropstenmainnet && keys.indexOf('rpcURLropstenmainnet') !== -1
                ? data.rpcURLropstenmainnet
                : ropsten.rpc,
          },
        }
        await chainsController.setCustomRpcUrls(result)
      }
      handleClose()
    } catch (e) {
      addNotification({
        title: 'Invalid URL',
        message: `${(e as Error).message}`,
      })
    }
    setLoading(false)
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title="RPC"
      noPaddingInBody
      noPaddingInFooter
      footer={
        <Footer>
          <FooterButtonWrapper>
            <SecondaryButton type="button" onClick={handleClose} disabled={loading} fullWidth>
              <ButtonLabel>Cancel</ButtonLabel>
            </SecondaryButton>
          </FooterButtonWrapper>
          <FooterButtonWrapper>
            <PrimaryButton type="submit" form="rpc_urls" loading={loading} disabled={!isEmpty(errors)} fullWidth>
              <ButtonLabel>Save</ButtonLabel>
            </PrimaryButton>
          </FooterButtonWrapper>
        </Footer>
      }
    >
      <FlexBox justifyContent="space-between" height="100%">
        <Form onSubmit={handleSubmit(onSubmit)} id="rpc_urls">
          <Panel>
            <ul>
              {urlsToRender.map((chainKey, index) => {
                const url: string | undefined = customURLs[chainKey].rpc
                return (
                  <Fragment key={CHAIN_CONFIGS[BlockchainNames[chainKey as BlockchainNames]].id + index}>
                    <ListContainer>
                      <AssetIcon icons={[CHAIN_CONFIGS[BlockchainNames[chainKey as BlockchainNames]].logo]} />
                      <InputField
                        name={`RPCURL${chainKey}`}
                        placeholder="RPC URL"
                        inputRef={register}
                        defaultValue={url ? url : ''}
                        tipError={errors[`RPCURL${chainKey}`]?.message}
                        errorMsg={errors[`RPCURL${chainKey}`]?.message}
                      />
                    </ListContainer>
                    <DashLine />
                  </Fragment>
                )
              })}
            </ul>
          </Panel>
        </Form>
        <Footer flexDirection="row">
          <FooterButtonWrapper>
            <SecondaryButton type="button" onClick={handleClose} disabled={loading} fullWidth>
              <ButtonLabel>Cancel</ButtonLabel>
            </SecondaryButton>
          </FooterButtonWrapper>
          <FooterButtonWrapper>
            <PrimaryButton type="submit" form="rpc_urls" loading={loading} disabled={!isEmpty(errors)} fullWidth>
              <ButtonLabel>Save</ButtonLabel>
            </PrimaryButton>
          </FooterButtonWrapper>
        </Footer>
      </FlexBox>
    </Dialog>
  )
}

const ListContainer = styled.li`
  padding: 0 16px;
  &:hover {
    background-color: ${COLORS.backgroundGrey};
  }
`

const Panel = styled(FlexBox)`
  justify-content: flex-start;
  position: relative;
  box-sizing: border-box;
  padding: 16px 0;
  height: 460px;

  & > ul {
    margin: 0px;
    padding: 0px;
    list-style: none;
    width: 100%;

    & > div:last-child {
      display: none;
    }

    & > li {
      height: 75px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      div[class^='FlexBox'] {
        height: 30px;
      }

      & > span {
        flex: 1;
        text-align: center;
        text-transform: capitalize;
      }
    }
  }
`

const Form = styled.form`
  width: 100%;
  position: relative;
`
const FooterButtonWrapper = styled(FlexBox).attrs({
  px: 4,
})`
  width: 100%;
`

const Footer = styled(FlexBox).attrs({
  flexDirection: 'row',
  p: '16px 8px',
})`
  background: ${COLORS.backgroundGrey};
  width: 100%;
`

export default EditRPCURLDialog
