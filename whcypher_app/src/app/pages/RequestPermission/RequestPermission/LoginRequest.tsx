import React from 'react'
import { IAccountData } from 'src/serviceWorker/app/store/reducers/applicationReducer'

import AccountRequestBar from '../components/AccountRequestBar'
import ButtonsTemplate from '../components/ButtonsTemplate'
import CancelButton from '../components/CancelButton'
import ConnectButton from '../components/ConnectButton'
import HomeStatusTemplate from '../components/HomeStatusTemplate'
import RenderComponent from '../components/RenderComponent'
import { IWebPageRequest } from './types'

interface IProps {
  webPageRequest: IWebPageRequest
  accountData: IAccountData
}

const LoginRequest = ({ webPageRequest, accountData }: IProps) => {
  const headerText = 'requests you to sign in'

  return (
    <RenderComponent>
      <AccountRequestBar host={webPageRequest.host} text={headerText} />
      <HomeStatusTemplate pubKey={accountData.pubKey} name={accountData.name} />
      <ButtonsTemplate>
        <CancelButton webPageRequest={webPageRequest} />
        <ConnectButton webPageRequest={webPageRequest} accountData={accountData} />
      </ButtonsTemplate>
    </RenderComponent>
  )
}

export default LoginRequest
