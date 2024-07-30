import { Button, CircularProgress } from '@material-ui/core'
import cx from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import TextInput from 'src/app/components/Form/TextInput/TextInput'
import { formatPeriod } from 'src/app/helpers/formatters'

interface IProps {
  paymentPeriods: any
  paymentPeriodsOptions: any
  selectedPeriodId: string
  referralCode: string
  onSelectPeriodId: (periodId: string) => void
  onUpdateReferralCode: (referralCode: string) => void
  onProceed: () => void
  formDisabled: boolean
  nextStepLoading: boolean
}

import { formatExpireDate } from 'src/app/helpers/date'

import styles from './SelectPeriod.module.scss'

const SelectPeriod = ({
  paymentPeriods,
  paymentPeriodsOptions,
  selectedPeriodId,
  referralCode,
  onSelectPeriodId,
  onUpdateReferralCode,
  onProceed,
  formDisabled,
  nextStepLoading,
}: IProps) => {
  const [referralCodeError, setReferralCodeError] = useState('')
  const [referralCodeGreenHint, setReferralCodeGreenHint] = useState('')

  useEffect(() => {
    if (paymentPeriodsOptions?.errors?.referralCode) {
      setReferralCodeError(paymentPeriodsOptions.errors.referralCode[0])
      setReferralCodeGreenHint('')
    } else {
      setReferralCodeError('')
      if (paymentPeriodsOptions?.referralCode) {
        setReferralCodeGreenHint('Referral cod applied')
      }
    }
  }, [paymentPeriodsOptions])

  const handlePeriodChange = useCallback(
    (e: any) => {
      onSelectPeriodId(e.target.value)
    },
    [onSelectPeriodId],
  )

  const handleReferralChange = useCallback(
    (newReferralCode: string) => {
      onUpdateReferralCode(newReferralCode)
    },
    [onUpdateReferralCode],
  )

  return (
    <>
      <form>
        {Object.keys(paymentPeriods).map((periodId) => (
          <div
            key={periodId}
            className={cx(styles.periodButtonWrapper, selectedPeriodId === periodId ? styles.selected : '')}
            onClick={() => onSelectPeriodId(periodId)}
          >
            {periodId === '6M' ? <span className={styles.periodLabel}>★ Recommended</span> : ''}

            <div className={styles.periodDetailsWrapper}>
              <div>
                <input
                  type="radio"
                  name="period"
                  id={`period-${periodId}`}
                  value={periodId}
                  disabled={formDisabled}
                  onChange={handlePeriodChange}
                  checked={selectedPeriodId === periodId}
                />
                <label htmlFor={`period-${periodId}`}>{formatPeriod(periodId)}</label>
              </div>

              {paymentPeriods[periodId].fullAmount && (
                <div className={styles.amount}>
                  <s>{paymentPeriods[periodId].fullAmount}</s>{' '}
                  <span className={styles.amountWithDiscount}>{paymentPeriods[periodId].amount} USD</span>
                </div>
              )}
              {!paymentPeriods[periodId].fullAmount && (
                <div className={styles.amount}>{paymentPeriods[periodId].amount} USD</div>
              )}
            </div>

            <div className={styles.periodInfoWrapper}>
              Expiration date: <b>{formatExpireDate(paymentPeriods[periodId].expiresAt, 'ceil')}</b>
            </div>
          </div>
        ))}

        <div className={styles.inputWithLinkWrapper}>
          <TextInput
            label="Referral code"
            value={referralCode || ''}
            error={referralCodeError}
            greenInfo={referralCodeGreenHint}
            extraStyles={{ marginBottom: 15 }}
            onInputChanged={handleReferralChange}
            toolTip="Specify how much you want to send to destination address."
          />
        </div>
      </form>

      <Button
        variant="contained"
        color="primary"
        onClick={onProceed}
        size="medium"
        disabled={nextStepLoading || formDisabled}
        fullWidth
        style={{ marginTop: 18 }}
      >
        {nextStepLoading ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Proceed'}
      </Button>
    </>
  )
}

export default SelectPeriod
