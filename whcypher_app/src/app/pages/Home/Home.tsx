import React from 'react'
import { useLocalStorage } from 'src/app/hooks/useLocalStorage'

import NeedHelp from '../../components/NeedHelp/NeedHelp'
import ActivitiesTab from './ActivitiesTab/ActivitiesTab'
import AccountHeader, { TABS } from './Home/AccountHeader'
import { SContainer } from './styleds'
import WalletsTab from './WalletsTab/WalletsTab'
import { Web3Tab } from './Web3Tab/Web3Tab'

const App = () => {
  const [tabId, setTabId] = useLocalStorage('CURRENT_TAB_KEY', TABS.WALLETS)

  return (
    <div className="Home">
      <AccountHeader tab={tabId} setTabId={setTabId} />

      <SContainer
        isActivity={tabId === TABS.ACTIVITY}
        style={{
          paddingLeft: tabId === TABS.ACTIVITY ? 0 : 20,
          paddingRight: tabId === TABS.ACTIVITY ? 0 : 14,
        }}
      >
        {tabId === TABS.WALLETS && <WalletsTab />}
        {tabId === TABS.ACTIVITY && <ActivitiesTab />}
        {tabId === TABS.WEB3 && <Web3Tab />}
      </SContainer>

      <NeedHelp />
    </div>
  )
}

export default App
