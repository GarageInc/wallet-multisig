import { Checkbox } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import styles from './TermsOfUseCheckbox.module.scss'

interface IProps {
  onCheckChanged: (v: boolean) => void
  onReadTA: () => void
}

const Accept = ({ onCheckChanged, onReadTA }: IProps) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    onCheckChanged(checked)
  }, [checked, onCheckChanged])

  return (
    <div className={styles.container}>
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        inputProps={{ 'aria-label': 'primary checkbox' }}
        style={{
          color: '#767676',
          width: 25,
          height: 25,
          marginTop: -9,
          marginLeft: -9,
        }}
      />

      <p className={styles.label}>
        I have read and agree to the{' '}
        <span className={styles.link} onClick={onReadTA}>
          Terms of Use
        </span>
      </p>
    </div>
  )
}

export default Accept
