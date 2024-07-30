import { ICustomRPCUrls } from 'src/serviceWorker/app/store/reducers/settingsReducer'

export interface IEditRPCURLDialog {
  customURLs: ICustomRPCUrls
  open: boolean
  handleClose: () => void
  urlsToRender: string[]
}
