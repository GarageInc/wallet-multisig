import { Typography } from '@material-ui/core'
import { useCallback } from 'react'
import { formatExpireDate } from 'src/app/helpers/date'
import { formatPeriod } from 'src/app/helpers/formatters'

import styles from './SelectPaymentMethod.module.scss'

export interface IPeriod {
  amount: number
  fullAmount?: number
  expiresAt: number
}

interface IProps {
  paymentMethods: any[]
  paymentMethodsOptions: any
  selectedPeriodId: string
  selectedPeriod: IPeriod
  onSelectPaymentMethodId: (paymentMethodId: string) => void
}

const SelectPaymentMethod = ({
  paymentMethods,
  paymentMethodsOptions,
  selectedPeriodId,
  selectedPeriod,
  onSelectPaymentMethodId,
}: IProps) => {
  const paymentMethodCurrency = useCallback((paymentMethod: string) => {
    return paymentMethod.split('_')[0]
  }, [])

  const hasLabel = useCallback((paymentMethod: string) => {
    return !!paymentMethod.split('_')[1]
  }, [])

  const paymentMethodLabel = useCallback((paymentMethod: string) => {
    const [currency, type] = paymentMethod.split('_')

    switch (type) {
      case 'ERC20':
        return 'ERC20'
      case 'TRC20':
        return 'TRC20'
      default:
        return ''
    }
  }, [])

  return (
    <>
      <div className={styles.sectionWrapper}>
        <Typography className={styles.sectionDescriptionTitle}>Your order details</Typography>

        <div className={styles.packageDetailsWrapper}>
          <div className={styles.packageDetails}>
            <div>{formatPeriod(selectedPeriodId)}</div>

            {selectedPeriod.fullAmount && (
              <div className={styles.amount}>
                <s>{selectedPeriod.fullAmount}</s>{' '}
                <span className={styles.amountWithDiscount}>{selectedPeriod.amount} USD</span>
              </div>
            )}
            {!selectedPeriod.fullAmount && <div className={styles.amount}>{selectedPeriod.amount} USD</div>}
          </div>

          <Typography className={styles.packageInfo}>
            Expiration date: <b>{formatExpireDate(selectedPeriod.expiresAt, 'ceil')}</b>
          </Typography>

          {paymentMethodsOptions?.referralCode && (
            <Typography className={styles.packageInfo}>
              Applied referral code: <b>{paymentMethodsOptions.referralCode}</b>
            </Typography>
          )}
        </div>
      </div>

      <hr className={styles.separator} />

      <div className={styles.sectionWrapper}>
        <Typography className={styles.sectionDescriptionTitle}>Select payment method</Typography>

        <div className={styles.paymentButtonsWrapper}>
          {paymentMethods.map((paymentMethod) => (
            <button
              key={paymentMethod.paymentMethod}
              className={styles.paymentButtonWrapper}
              onClick={() => onSelectPaymentMethodId(paymentMethod.paymentMethod)}
            >
              <div className={styles.paymentMethodWrapper}>
                <div className={styles.paymentMethod}>
                  <div className={styles.paymentMethodNameWrapper}>
                    {paymentMethodCurrency(paymentMethod.paymentMethod)}{' '}
                    {hasLabel(paymentMethod.paymentMethod) && (
                      <span className={styles.paymentMethodLabel}>
                        {paymentMethodLabel(paymentMethod.paymentMethod)}
                      </span>
                    )}
                  </div>

                  <div>
                    <img
                      className={styles.currencyImage}
                      src={`../../static/image/tokens/${paymentMethodCurrency(paymentMethod.paymentMethod)}.png`}
                    ></img>
                  </div>
                </div>

                <Typography className={styles.paymentInfo}>
                  Provided by <b>{paymentMethod.provider}</b>
                </Typography>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default SelectPaymentMethod
