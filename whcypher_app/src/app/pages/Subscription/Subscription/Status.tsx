import { Button, CircularProgress, Link, Typography } from '@material-ui/core'
import { WarningBlock } from 'src/app/components/WarningBlock/WarningBlock'
import { formatExpireDate } from 'src/app/helpers/date'
import { formatPeriod } from 'src/app/helpers/formatters'

import styles from './Status.module.scss'

interface IPendingSubscription {
  accountPubKey: string
  paymentAmount: number
  paymentAmountUSD: number
  paymentMethod: string
  paymentProvider: string
  paymentProviderStatus: string
  period: string
  plan: string
  redirectUrl: string
  sessionId: string
  status: string
}

interface IProps {
  currentSubscription: any
  currentSubscriptionGetFailed: boolean
  onProceed: () => void
  nextStepLoading: boolean
  pendingSubscriptionPayments: IPendingSubscription[]
}

const Status = ({
  currentSubscription,
  currentSubscriptionGetFailed,
  onProceed,
  nextStepLoading,
  pendingSubscriptionPayments,
}: IProps) => {
  return (
    <>
      {pendingSubscriptionPayments.length > 0 && (
        <WarningBlock
          text={
            <>
              <div>You have unfinished payments:</div>
              <ul className={styles.pendingPaymentsWrapper}>
                {pendingSubscriptionPayments.map((pendingSubscriptionPayment: IPendingSubscription) => {
                  return (
                    <li key={pendingSubscriptionPayment.sessionId}>
                      <Link href={pendingSubscriptionPayment.redirectUrl} target="_blank">
                        {pendingSubscriptionPayment.plan} plan for {formatPeriod(pendingSubscriptionPayment.period)}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </>
          }
        ></WarningBlock>
      )}

      <div className={styles.dataWrapper}>
        <div className={styles.inlineData}>
          <Typography className={styles.fieldText}>Current plan: </Typography>
          <div>
            <Typography className={styles.fieldValue}>
              {currentSubscriptionGetFailed ? currentSubscription.plan : 'N/A'}
            </Typography>
          </div>
        </div>

        <div className={styles.inlineData}>
          <Typography className={styles.fieldText}>Expires on: </Typography>
          <div>
            <Typography className={styles.fieldValue}>
              {currentSubscription.plan == 'FREE' ? 'Never' : formatExpireDate(currentSubscription.expiresAt, 'ceil')}
            </Typography>
          </div>
        </div>

        <div className={styles.inlineData}>
          <Typography className={styles.fieldText}>Can init (join) wallets: </Typography>
          <div>
            <Typography className={styles.fieldValue}>
              {currentSubscription.consumed?.vaultsInit} ({currentSubscription.consumed?.vaultsJoin})
            </Typography>
          </div>
        </div>

        <div className={styles.inlineData}>
          <Typography className={styles.fieldText}>Max. wallet participants: </Typography>
          <div>
            <Typography className={styles.fieldValue}>{currentSubscription.limits?.maxPartiesAmount}</Typography>
          </div>
        </div>

        <div className={styles.inlineData}>
          <Typography className={styles.fieldText}>
            {currentSubscription.plan == 'FREE' ? 'Init (join) transactions (24h limit):' : 'Init (join) transactions:'}
          </Typography>
          <div>
            <Typography className={styles.fieldValue}>
              {currentSubscription.consumed?.dailyInitTransactions > 1000 ? (
                'Unlimited'
              ) : (
                <>
                  {currentSubscription.consumed?.dailyInitTransactions} (
                  {currentSubscription.consumed?.dailyJoinTransactions})
                </>
              )}
            </Typography>
          </div>
        </div>
      </div>

      <div className={styles.packageDescriptionWrapper}>
        <Typography className={styles.packageDescriptionTitle}>
          {currentSubscription.plan == 'FREE' ? 'Consider Premium account to' : 'Prolong Premium account to'}
        </Typography>
        <ul>
          <li>Create unlimited amount of multisig wallets</li>
          <li>Create multisigs wallets with up to 8 participants</li>
          <li>Make transactions without limits</li>
          <li>Get priority support</li>
        </ul>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={onProceed}
        size="medium"
        disabled={nextStepLoading}
        fullWidth
        style={{ marginTop: 18 }}
      >
        {nextStepLoading ? (
          <CircularProgress style={{ color: 'white' }} size={16} />
        ) : currentSubscription.plan == 'FREE' ? (
          'Upgrade'
        ) : (
          'Prolong'
        )}
      </Button>
    </>
  )
}

export default Status
