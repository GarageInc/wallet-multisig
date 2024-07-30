import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { COLORS } from 'src/app/componentElements/Colors'
import { IActivityData } from 'src/serviceWorker/app/store/reducers/accountActivitiesReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import { WALLET_PAGE_PATH } from '../../../../constants/paths'
import { sigFigs } from '../../../../helpers/formatters'
import { formatAddress, formatCurrency } from '../../../../helpers/formatters'
import { addressURL, nftURL, transactionURL } from '../../../../helpers/links'
import { createAvatarSvg } from '../../../../helpers/publicKeyImageCreator'
import {
  PlainLink,
  SAvatar,
  SBodyText,
  SCopy,
  SError,
  SField,
  SFieldWithIcon,
  SIconButton,
  SInline,
  SItem,
  SLabel,
  SLink,
  SOpenInBrowserIcon,
  SOpenInNewIcon,
  SParticipants,
  SValueText,
  SWrapper,
} from './styled'

const Activity = ({ data }: { data: IActivityData[] }) => {
  const history = useHistory()

  const activeAccountPubkey = useSelector((state: AppState) => state.application.activeAccountData.pubKey)

  const activityData = data

  const openWalletPage = useCallback(
    (blockchain: BlockchainNames, address: string) => {
      history.push({
        pathname: WALLET_PAGE_PATH,
        search: `?blockchain=${blockchain}&walletAddress=${address}`,
      })
    },
    [history],
  )

  return (
    <SWrapper>
      {data.map((item) => {
        const { field, value, subvalue, error, link, assetId } = item

        if (field === 'NoData') {
          return (
            <SItem key={field}>
              <SBodyText>{value}</SBodyText>
              {link && (
                <PlainLink href={link} target="_blank">
                  Read more...
                </PlainLink>
              )}
            </SItem>
          )
        }

        if (field === 'Address From' || field === 'Address To' || field === 'Address') {
          const blockchain = activityData.find((entry) => entry.field === 'Network')
          if (!blockchain) {
            return null
          }
          return (
            <SInline key={field}>
              <SField>
                <SLabel>{field}</SLabel>
              </SField>
              <SField>
                <SFieldWithIcon>
                  <SValueText>{formatAddress(value, 6)}</SValueText>

                  <SCopy text={value} iconStyle={{ color: COLORS.palette.blue }} />

                  {field !== 'Address To' ? (
                    <SIconButton onClick={() => openWalletPage(blockchain.value, value)}>
                      <SOpenInBrowserIcon />
                    </SIconButton>
                  ) : blockchain ? (
                    <SLink target="_blank" href={addressURL(blockchain.value, value)}>
                      <SOpenInNewIcon />
                    </SLink>
                  ) : null}
                </SFieldWithIcon>
                {error && <SError>{error}</SError>}
              </SField>
            </SInline>
          )
        }

        if (field === 'Network') {
          return (
            <SInline key={field}>
              <SField>
                <SLabel>{field}</SLabel>
              </SField>
              <SField>
                <SValueText>{value}</SValueText>
                {error && <SError>{error}</SError>}
              </SField>
            </SInline>
          )
        }

        if ((field === 'Participants' || field === 'Approved by') && value && value.length) {
          return (
            <SInline key={field}>
              <SField>
                <SLabel>{field}</SLabel>
              </SField>

              <SField>
                {Array.isArray(value) &&
                  value.map((pubKey) => (
                    <SParticipants key={pubKey}>
                      <SAvatar
                        alt="avatar"
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(createAvatarSvg(pubKey))}`}
                      />
                      <SValueText>{activeAccountPubkey === pubKey ? 'You' : formatAddress(pubKey, 6)}</SValueText>
                    </SParticipants>
                  ))}
              </SField>
            </SInline>
          )
        }

        if (field === 'Trx ID' || field === 'Has a counter deal') {
          const blockchain = activityData.find((entry) => entry.field === 'Network')
          return (
            <SInline key={field}>
              <SField>
                <SLabel>{field}</SLabel>
              </SField>
              <SField>
                <SFieldWithIcon>
                  <SValueText>{formatAddress(value, 6)}</SValueText>

                  <SCopy text={value} c iconStyle={{ color: COLORS.palette.blue }} />

                  <SLink target="_blank" href={transactionURL(blockchain.value, value)}>
                    <SOpenInNewIcon />
                  </SLink>
                </SFieldWithIcon>
                <SError>{error}</SError>
              </SField>
            </SInline>
          )
        }

        if (field === 'Amount' || field === 'Fee') {
          return (
            <SInline key={field}>
              <SField>
                <SLabel>{field}</SLabel>
              </SField>
              {typeof value === 'number' && (
                <SField>
                  <SValueText>
                    {sigFigs(value, 4)} {formatCurrency(subvalue)}
                  </SValueText>
                </SField>
              )}
            </SInline>
          )
        }

        if (field === 'Token ID') {
          const blockchain = activityData.find((entry) => entry.field === 'Network')
          if (!blockchain) {
            return null
          }
          return (
            <SInline key={field}>
              <SField>
                <SLabel>{field}</SLabel>
              </SField>
              <SField>
                <SFieldWithIcon>
                  <SValueText>
                    #{value} {formatCurrency(subvalue)}
                  </SValueText>
                  {typeof blockchain.value === 'string' && typeof value === 'string' && (
                    <SLink target="_blank" href={nftURL(blockchain.value, assetId, value)}>
                      <SOpenInNewIcon />
                    </SLink>
                  )}
                </SFieldWithIcon>
              </SField>
            </SInline>
          )
        }

        if (field === 'Min approves to spend') {
          const totalParties = activityData.find((entry) => entry.field === 'Total parties')
          if (!totalParties) return <React.Fragment key={field} /> // We are rendering transaction info
          return (
            <SInline key={field}>
              <SField>
                <SLabel>Wallet schema</SLabel>
              </SField>
              <SField>
                <SValueText>
                  {value}
                  -of-
                  {totalParties.value}
                </SValueText>
              </SField>
            </SInline>
          )
        }
        if (field === 'Total parties') return <React.Fragment key={field} />

        return (
          <SInline key={field}>
            <SField>
              <SLabel>{field}</SLabel>
            </SField>
            <SField>
              <SValueText>{value}</SValueText>
              <SError>{error}</SError>
            </SField>
          </SInline>
        )
      })}
    </SWrapper>
  )
}

export default Activity
