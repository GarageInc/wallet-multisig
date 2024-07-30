import React, { useCallback } from 'react'

import * as steps from '../../constants/appInitSteps'
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import { setAppInitPath } from '../../helpers/backgroundMethods'
import styles from './NewSeedOrImport.module.scss'
import OptionButton from './NewSeedOrImport/OptionButton'

interface IProps {
  onNext: () => void
}

const NewSeedOrImport = ({ onNext }: IProps) => {
  const proceedToImportSeedPath = useCallback(() => {
    setAppInitPath(steps.IMPORT_SEED_WORDS, () => {
      onNext()
    })
  }, [onNext])

  const proceedToNewSeedPath = useCallback(() => {
    setAppInitPath(steps.NEW_SEED_WORDS, () => {
      onNext()
    })
  }, [onNext])

  return (
    <ContentWrapper title="New to TotalSig?" noFooter>
      <div className={styles.container}>
        <OptionButton
          title="Yes, let’s get set up!"
          subTitle="Create a new TotalSig account and a seed phrase"
          btnLabel="Create"
          className={styles.topCard}
          onClick={proceedToNewSeedPath}
        />

        <OptionButton
          title="I already have a seed phrase"
          subTitle="Import your existing TotalSig account using a 15 word seed phrase"
          btnLabel="Import"
          className={styles.bottomCard}
          onClick={proceedToImportSeedPath}
        />
      </div>
    </ContentWrapper>
  )
}

export default NewSeedOrImport
