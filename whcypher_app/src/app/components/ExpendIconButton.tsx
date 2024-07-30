import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))

interface IProps {
  expended: boolean
}

export default function ExpendIconButton(props: IProps) {
  const classes = useStyles()

  return (
    <ExpandMoreIcon
      className={clsx(classes.expand, {
        [classes.expandOpen]: props.expended,
      })}
    />
  )
}
