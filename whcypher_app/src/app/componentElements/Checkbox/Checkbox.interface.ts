import { ReactNode, Ref } from 'react'

export type ICheckbox = {
  checked?: boolean
  onChange?: (checked: boolean) => void
  inputRef?: Ref<HTMLInputElement>
  children: ReactNode
  name?: string
  onClick?: (e: any) => void
}
