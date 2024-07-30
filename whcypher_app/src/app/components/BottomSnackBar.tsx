import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'src/serviceWorker/app/store/store'

import { closeSnackBar } from '../helpers/backgroundMethods'

export default function BottomSnackbar() {
  const open = useSelector((state: AppState) => state.snackbar.open)
  const variant = useSelector((state: AppState) => state.snackbar.variant)
  const message = useSelector((state: AppState) => state.snackbar.message)

  const handleClose = useCallback(() => {
    closeSnackBar()
  }, [])

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        style={{ width: '100%' }}
        severity={variant}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
