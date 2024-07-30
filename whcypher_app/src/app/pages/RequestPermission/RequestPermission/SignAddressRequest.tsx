import React from 'react'
import { IAccountData } from 'src/serviceWorker/app/store/reducers/applicationReducer'

import AccountRequestBar from '../components/AccountRequestBar'
import ButtonsTemplate from '../components/ButtonsTemplate'
import CancelButton from '../components/CancelButton'
import RenderComponent from '../components/RenderComponent'
import RequestDestinations from '../components/RequestDestinations'
import SignDestinationsButton from '../components/SignDestinationsButton'
import { IWebPageRequest } from './types'

interface IProps {
  webPageRequest: IWebPageRequest
  accountData: IAccountData
}

const SignAddressRequest = ({ webPageRequest, accountData }: IProps) => {
  const headerText = 'is asking you to sign following addresses:'

  const { context } = webPageRequest

  return (
    <RenderComponent>
      <AccountRequestBar host={webPageRequest.host} text={headerText} />
      <RequestDestinations destinations={context.destinations} />
      <ButtonsTemplate>
        <CancelButton webPageRequest={webPageRequest} />
        <SignDestinationsButton webPageRequest={webPageRequest} accountData={accountData} />
      </ButtonsTemplate>
    </RenderComponent>
  )
}

export default SignAddressRequest
