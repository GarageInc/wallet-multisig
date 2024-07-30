import { Grid, Typography } from '@material-ui/core'
import React from 'react'

interface IProps {
  host: string
  text: string
}

const AccountRequestBar = ({ host, text }: IProps) => (
  <Grid container direction="column" style={{ padding: '24px 0' }}>
    <Typography>
      <span style={{ fontWeight: 'bold' }}>{host}</span>
    </Typography>
    <Typography>{text}</Typography>
  </Grid>
)

export default AccountRequestBar
