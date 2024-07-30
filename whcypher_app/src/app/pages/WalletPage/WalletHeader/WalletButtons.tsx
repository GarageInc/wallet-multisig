import pluralize from 'pluralize'
import { useHistory } from 'react-router'
import { COLORS } from 'src/app/componentElements/Colors'
import { IconSend, InfoIcon } from 'src/app/componentElements/icons'
import { WALLET_REQUESTS_PATH, WALLET_SEND_FORM_PATH } from 'src/app/constants/paths'

import { RequestsAmountBadge, SBtnLabel, SButtons, SIconButton } from './styleds'

export const WalletButtons = ({
  walletDataWithRequests,
  walletId,
}: {
  walletDataWithRequests: any
  walletId: string
}) => {
  const history = useHistory()

  return (
    <SButtons>
      <div
        onClick={() =>
          history.push({
            pathname: WALLET_SEND_FORM_PATH,
            search: `?walletId=${walletId}`,
          })
        }
      >
        <SIconButton>
          <IconSend />
        </SIconButton>
        <SBtnLabel>Send</SBtnLabel>
      </div>

      {walletDataWithRequests.requests.length ? (
        <div
          onClick={() =>
            history.push({
              pathname: WALLET_REQUESTS_PATH,
              state: { walletData: walletDataWithRequests },
            })
          }
        >
          <RequestsAmountBadge>
            <InfoIcon color={COLORS.palette.yellow} />
          </RequestsAmountBadge>
          <SBtnLabel>
            {walletDataWithRequests.requests.length} {pluralize('request', walletDataWithRequests.requests.length)}
          </SBtnLabel>
        </div>
      ) : (
        <div>
          <SIconButton>
            <InfoIcon />
          </SIconButton>
          <SBtnLabel>No requests</SBtnLabel>
        </div>
      )}
    </SButtons>
  )
}
