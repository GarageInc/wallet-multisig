import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { AppState } from 'src/serviceWorker/app/store/store'

import { SUBSCRIPTION_PLAN_SELECT_PATH } from '../../constants/paths'
import { SContainer, SLink } from './styles'

const NeedHelp = () => {
  const subscriptionPlan = useSelector((state: AppState) => state.subscription.plan)

  const history = useHistory()

  const toSubscriptionPage = () => {
    history.push(SUBSCRIPTION_PLAN_SELECT_PATH)
  }

  return (
    <>
      {subscriptionPlan == 'FREE' ? (
        <SContainer>
          <SLink onClick={toSubscriptionPage}>Upgrade to premium!</SLink>
        </SContainer>
      ) : (
        <SContainer>
          <span>
            Found a bug or need a feature?{' '}
            <a href="https://www.totalsig.com/contact" target="_blank" rel="noreferrer">
              Contact us
            </a>
          </span>
        </SContainer>
      )}
    </>
  )
}

export default NeedHelp
