import { Grid } from '@material-ui/core'
import React from 'react'

interface IProps {
  children: any
}

const ButtonsTemplate = ({ children }: IProps) => (
  <Grid container direction="row" style={{ padding: 16 }} spacing={2}>
    {children}
  </Grid>
)

export default ButtonsTemplate
