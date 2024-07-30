import { Dialog, DialogTitle } from '@material-ui/core'
import React from 'react'
import QRCode from 'react-qr-code'
import { COLORS } from 'src/app/componentElements/Colors'

import Icon from '../../componentElements/Icon/Icon'

interface IQRModalProps {
  code: string
  title: string
  handleClose: () => void
  open: boolean
}

function QRModal({ code, title, handleClose, open }: IQRModalProps) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle style={{ textAlign: 'center', paddingTop: '47px' }}>{title}</DialogTitle>
      <div style={{ padding: '0 42px 42px' }}>
        <Icon
          icon="close"
          size={24}
          onClick={handleClose}
          color={COLORS.palette.blue}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            cursor: 'pointer',
          }}
        />
        <QRCode value={code} size={200} />
      </div>
    </Dialog>
  )
}

export default QRModal
