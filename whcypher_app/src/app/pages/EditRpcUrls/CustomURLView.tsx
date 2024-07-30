import { CHAIN_CONFIGS } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { Fragment, useMemo, useState } from 'react'
import { Card, DashLine, FlexBox, IconButton, IconButtonVariant } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import Small from 'src/app/componentElements/Typography/Body/Small'
import Label from 'src/app/componentElements/Typography/Label/Label'
import { AssetIcon } from 'src/app/components/AssetIcon/AssetIcon'
import { makeShortString } from 'src/app/helpers/stringHelper'
import { ICustomRPCUrls } from 'src/serviceWorker/app/store/reducers/settingsReducer'
import styled from 'styled-components'

import EditRPCURLDialog from './EditRPCUrlsDialog/EditRPCUrlsDialog'

export interface ICustomURLView {
  customURLs: ICustomRPCUrls
}

const Icon = styled(AssetIcon).attrs({})`
  margin-right: 8px;
`

const CustomURLView = ({ customURLs }: ICustomURLView) => {
  const [open, setOpen] = useState(false)
  const chainId = 'all'
  const urlsToRender = useMemo(() => {
    if (chainId === 'all') {
      return Object.keys(customURLs)
    }
    return Object.keys(customURLs).filter((chain) => chain === chainId)
  }, [chainId, customURLs])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Wrapper $chainSelected={chainId !== 'all'}>
      <Panel $chainSelected={chainId !== 'all'}>
        <ul>
          {urlsToRender.map((chainKey, index) => {
            const url: string | undefined = customURLs[chainKey]?.rpc
            const chainConfig = CHAIN_CONFIGS[chainKey]
            return (
              <Fragment key={CHAIN_CONFIGS[BlockchainNames[chainKey as BlockchainNames]].id + index}>
                <li>
                  <Icon icons={[CHAIN_CONFIGS[BlockchainNames[chainKey as BlockchainNames]].logo]} />
                  <RPCURL>
                    <Label>URL</Label>
                    <Small>{url ? makeShortString(url, 10, 5) : chainConfig.config.rpcUrl}</Small>
                  </RPCURL>
                </li>
                <DashLine />
              </Fragment>
            )
          })}
        </ul>
        {open && (
          <EditRPCURLDialog customURLs={customURLs} open={open} handleClose={handleClose} urlsToRender={urlsToRender} />
        )}
      </Panel>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ $chainSelected: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  ${({ $chainSelected }) => $chainSelected && `display: initial;`}
`

const Panel = styled(Card)<{ $chainSelected: boolean }>`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  box-sizing: border-box;
  background-color: ${COLORS.backgroundGrey};
  border-radius: 11px;
  margin-bottom: 10px;

  ${({ $chainSelected }) => $chainSelected && `margin-bottom: 70px; margin-right:20px;`}
  & > ul {
    margin: 0px;
    padding: 0px;
    list-style: none;
    width: 100%;

    & > div:last-child {
      display: none;
    }

    & > li {
      height: 50px;
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > div {
        flex: 1 0 auto;
      }
    }
  }
`

const Heading = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`

const EditButton = styled(IconButton).attrs({
  variant: IconButtonVariant.rounded,
})``

const RPCURL = styled(FlexBox).attrs({
  flexDirection: 'column',
  width: 240,
  pr: 16,
  alignItems: 'flex-end',
})`
  word-wrap: break-word;
`
export default CustomURLView
