import { CircularProgress } from '@material-ui/core'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
  getCurrentAccountSubscriptionData,
  getPendingSubscriptionPayments,
  getSubscriptionPaymentMethods,
  getSubscriptionPaymentPeriods,
  initSubscriptionPayment,
} from 'src/app/helpers/backgroundMethods'
import { useDebouncedEffect } from 'src/app/hooks/useDebouncedEffect'
import Browser from 'webextension-polyfill'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import styles from './Subscription.module.scss'
import SelectPaymentMethod, { IPeriod } from './Subscription/SelectPaymentMethod'
import SelectPeriod from './Subscription/SelectPeriod'
import Status from './Subscription/Status'

const step = {
  STATUS: 'status',
  SELECT_PERIOD: 'select_period',
  SELECT_PAYMENT_METHOD: 'select_payment_method',
}

const pageTitle = {
  STATUS: 'Subscription',
  SELECT_PERIOD: 'Select period',
  SELECT_PAYMENT_METHOD: 'Payment method',
}

const Subscription = () => {
  const history = useHistory()

  const [title, setTitle] = useState(pageTitle.STATUS)

  const [currentStep, setCurrentStep] = useState(step.STATUS)

  const [currentSubscription, setCurrentSubscription] = useState({})
  const [currentSubscriptionGetFailed, setCurrentSubscriptionGetFailed] = useState(false)
  const [pendingSubscriptionPayments, setPendingSubscriptionPayments] = useState([])

  const [paymentPlan] = useState('PREMIUM')

  const [paymentPeriods, setPaymentPeriods] = useState<{ [key: string]: IPeriod }>({})
  const [paymentPeriodsOptions, setPaymentPeriodsOptions] = useState(null)

  const [selectedPeriodId, setSelectedPeriodId] = useState('6M')
  const [referralCode, setReferralCode] = useState<string>('')

  const [paymentMethods, setPaymentMethods] = useState([])
  const [paymentMethodsOptions, setPaymentMethodsOptions] = useState(null)

  const [formInit, setFormInit] = useState(true)
  const [navigatingAway, setNavigatingAway] = useState(false)
  const [nextStepLoading, setNextStepLoading] = useState(false)

  const [formDisabled, setFormDisabled] = useState(false)

  useEffect(() => {
    setFormInit(true)

    getCurrentAccountSubscriptionData((response: any) => {
      setCurrentSubscriptionGetFailed(!response.error)
      if (!response.error) setCurrentSubscription(response)

      setFormInit(false)
    })
  }, [])

  useEffect(() => {
    setFormInit(true)

    getPendingSubscriptionPayments((response: any) => {
      // setCurrentSubscriptionGetFailed(!response.error)
      // if (!response.error) setCurrentSubscription(response)
      setFormInit(false)
      setPendingSubscriptionPayments(response)
    })
  }, [])

  useDebouncedEffect(
    () => {
      if (currentStep == step.SELECT_PERIOD && !nextStepLoading) {
        setFormDisabled(true)

        getSubscriptionPaymentPeriods(paymentPlan, referralCode, (response: any) => {
          if (!response.error) {
            setPaymentPeriods(response.paymentPeriods)
            setPaymentPeriodsOptions(response.options)
          }

          setFormDisabled(false)
        })
      }
    },
    500,
    [currentStep, paymentPlan, referralCode],
  )

  const onProceed = useCallback(() => {
    setNextStepLoading(true)
    // setFormInit(true)

    if (currentStep == step.STATUS) {
      getSubscriptionPaymentPeriods(paymentPlan, referralCode, (response: any) => {
        if (!response.error) {
          setPaymentPeriods(response.paymentPeriods)
          setPaymentPeriodsOptions(response.options)

          setCurrentStep(step.SELECT_PERIOD)
          setTitle(pageTitle.SELECT_PERIOD)
        }

        // setFormInit(false);
        setNextStepLoading(false)
        document.getElementById('pageContent').scrollTop = 0
      })
    } else if (currentStep == step.SELECT_PERIOD) {
      getSubscriptionPaymentMethods(paymentPlan, referralCode, selectedPeriodId, (response: any) => {
        if (!response.error) {
          setPaymentMethods(response.paymentMethods)
          setPaymentMethodsOptions(response.options)

          setCurrentStep(step.SELECT_PAYMENT_METHOD)
          setTitle(pageTitle.SELECT_PAYMENT_METHOD)
        }

        // setFormInit(false);
        setNextStepLoading(false)
        document.getElementById('pageContent').scrollTop = 0
      })
    }
  }, [currentStep, paymentPlan, referralCode, selectedPeriodId])

  const onSelectPeriodId = useCallback((periodId: any) => {
    setSelectedPeriodId(periodId)
  }, [])

  // [TODO] Take this down?
  const onUpdateReferralCode = useCallback((referralCode: string) => {
    setReferralCode(referralCode)
  }, [])

  const onSelectPaymentMethodId = useCallback(
    (paymentMethodId: string) => {
      setNextStepLoading(true)
      setNavigatingAway(true)

      initSubscriptionPayment(paymentPlan, referralCode, selectedPeriodId, paymentMethodId, (response: any) => {
        setNextStepLoading(false)

        if (!response.error) {
          // redirect to external payment page
          Browser.tabs.create({ url: response.redirectUrl })
        } else {
          setNavigatingAway(false)
        }
      })
    },
    [paymentPlan, referralCode, selectedPeriodId],
  )

  const onBack = useCallback(() => {
    if (currentStep == step.STATUS) {
      history.goBack()
    } else if (currentStep == step.SELECT_PERIOD) {
      setCurrentStep(step.STATUS)
      setTitle(pageTitle.STATUS)
      document.getElementById('pageContent').scrollTop = 0
    } else if (currentStep == step.SELECT_PAYMENT_METHOD) {
      setCurrentStep(step.SELECT_PERIOD)
      setTitle(pageTitle.SELECT_PERIOD)
      document.getElementById('pageContent').scrollTop = 0
    }
  }, [currentStep, history])

  return (
    <ContentWrapper title={title} goBack={onBack} noFooter>
      <div className={styles.container}>
        {(formInit || navigatingAway) && (
          <div className={styles.loadingWrapper}>
            <CircularProgress size={32} />
          </div>
        )}

        {!(formInit || navigatingAway) && (
          <>
            {currentStep == step.STATUS && (
              <Status
                currentSubscription={currentSubscription}
                currentSubscriptionGetFailed={currentSubscriptionGetFailed}
                onProceed={onProceed}
                nextStepLoading={nextStepLoading}
                pendingSubscriptionPayments={pendingSubscriptionPayments}
              ></Status>
            )}

            {currentStep == step.SELECT_PERIOD && (
              <SelectPeriod
                paymentPeriods={paymentPeriods}
                paymentPeriodsOptions={paymentPeriodsOptions}
                selectedPeriodId={selectedPeriodId}
                referralCode={referralCode}
                onSelectPeriodId={onSelectPeriodId}
                onUpdateReferralCode={onUpdateReferralCode}
                onProceed={onProceed}
                formDisabled={formDisabled}
                nextStepLoading={nextStepLoading}
              ></SelectPeriod>
            )}

            {currentStep == step.SELECT_PAYMENT_METHOD && (
              <SelectPaymentMethod
                paymentMethods={paymentMethods}
                paymentMethodsOptions={paymentMethodsOptions}
                selectedPeriodId={selectedPeriodId}
                selectedPeriod={paymentPeriods[selectedPeriodId]}
                onSelectPaymentMethodId={onSelectPaymentMethodId}
              ></SelectPaymentMethod>
            )}
          </>
        )}
      </div>
    </ContentWrapper>
  )
}

export default Subscription
