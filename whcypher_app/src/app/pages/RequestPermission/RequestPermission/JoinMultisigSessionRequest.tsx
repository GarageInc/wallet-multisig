import random from 'random-bigint'
import React from 'react'
import { IAccountData } from 'src/serviceWorker/app/store/reducers/applicationReducer'
import { ACCOUNT_MASTER_PATH } from 'src/shared/appConfigs'

import AccountRequestBar from '../components/AccountRequestBar'
import ButtonsTemplate from '../components/ButtonsTemplate'
import CancelButton from '../components/CancelButton'
import JoinMultisigButton from '../components/JoinMultisigButton'
import RenderComponent from '../components/RenderComponent'
import RequestJoinMultisigSession from '../components/RequestJoinMultisigSession'
import { IWebPageRequest } from './types'

interface IProps {
  webPageRequest: IWebPageRequest
  accountData: IAccountData
}

const headerText = 'is asking you to join a new multisig wallet:'

const path = `${ACCOUNT_MASTER_PATH}/0/${random(16)}/${random(16)}`

const JoinMultisigSessionRequest = ({ webPageRequest, accountData }: IProps) => {
  return (
    <RenderComponent>
      <AccountRequestBar host={webPageRequest.host} text={headerText} />
      <RequestJoinMultisigSession webPageRequest={webPageRequest} path={path} />
      <ButtonsTemplate>
        <CancelButton webPageRequest={webPageRequest} />
        <JoinMultisigButton webPageRequest={webPageRequest} accountData={accountData} path={path} />
      </ButtonsTemplate>
    </RenderComponent>
  )
}

export default JoinMultisigSessionRequest
