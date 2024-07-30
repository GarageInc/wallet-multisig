import { Box, Button, Card, CardContent, Typography } from '@material-ui/core'
import cx from 'classnames'
import React from 'react'

import styles from './OptionButton.module.scss'

interface IProps {
  title: string
  subTitle: string
  btnLabel: string
  onClick: () => void
  className?: string
}

const OptionButton = ({ title, subTitle, btnLabel, onClick, className }: IProps) => (
  <Card style={{ borderRadius: 13 }} className={cx(styles.cardContainer, className)}>
    <CardContent>
      <Typography className={styles.cardTitle}>{title}</Typography>
      <Typography className={styles.cardSubTitle}>{subTitle}</Typography>
      <Box mx={3}>
        <Button onClick={() => onClick()} color="primary" variant="contained" fullWidth>
          {btnLabel}
        </Button>
      </Box>
    </CardContent>
  </Card>
)

export default OptionButton
