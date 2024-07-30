import { Dispatch, SetStateAction, useState } from 'react'
import { FloatingDialog } from 'src/app/componentElements'

import { IConfirmDialog } from './ConfirmDialog.interface'

export const useDialogOpen = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [open, setOpen] = useState(false)

  return [open, setOpen]
}

const ConfirmDialog = ({ open, onClose, onSubmit, dialogTitle = '', children, ...props }: IConfirmDialog) => {
  return (
    <FloatingDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      {...props}
      iconLabel={dialogTitle}
      highOpacityBackground={false}
    >
      {children}
    </FloatingDialog>
  )
}
export default ConfirmDialog
