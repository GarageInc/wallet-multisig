import { IconButton } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FlexBox, FlexRow } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import { DownIcon, UpIcon } from 'src/app/componentElements/icons'
import { IActivity } from 'src/serviceWorker/app/store/reducers/accountActivitiesReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import styles from './ActivitiesTab.module.scss'
import Activity from './Activity/Activity'
import NoActivities from './NoActivities/NoActivities'
import { SActivity, SDate, SName, SNotExpandedActivity } from './styled'

const ActivitiesTab = () => {
  const accountActivities = useSelector((state: AppState) => state.accountActivities.activities)
  const [activities, setActivities] = useState<IActivity[]>([])
  const [expandId, setExpandId] = useState<string | null>(null)

  useEffect(() => {
    setActivities([...accountActivities].reverse())
  }, [accountActivities])

  return (
    <div className={styles.container}>
      {!activities.length && <NoActivities />}
      {!!activities.length &&
        activities.map((activity) => (
          <SActivity
            key={activity.id}
            style={{
              background: expandId === activity.id ? COLORS.palette.lightBlue : 'none',
            }}
          >
            <SNotExpandedActivity
              className={styles.item}
              onClick={() => (expandId === activity.id ? setExpandId(null) : setExpandId(activity.id))}
            >
              <FlexBox flexDirection="column" justifyContent="center">
                <FlexRow justifyContent="flex-start">
                  <SName>{activity.payload.label}</SName>
                  {activity.payload.labelError && <ErrorIcon className={styles.errorIcon} />}
                </FlexRow>
                <SDate>{activity.payload.time}</SDate>
              </FlexBox>

              <IconButton>
                {expandId !== activity.id ? (
                  <DownIcon className={styles.handlerIcon} />
                ) : (
                  <UpIcon className={styles.handlerIcon} />
                )}
              </IconButton>
            </SNotExpandedActivity>

            {expandId === activity.id && <Activity data={activity.payload.data} />}
          </SActivity>
        ))}
    </div>
  )
}

export default ActivitiesTab
