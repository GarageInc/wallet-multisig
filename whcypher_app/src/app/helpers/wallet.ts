import { IPreviewSession } from '../pages/RequestPermission/components/RequestJoinMultisigSession'

const _jsSha = require('js-sha256')

export const walletSessionToId = (session: IPreviewSession) => {
  const hash = _jsSha.sha256.create()
  return hash.update(`${session.blockchain}(${session.address}):${session.joinedSequence}`).toString(16)
}
