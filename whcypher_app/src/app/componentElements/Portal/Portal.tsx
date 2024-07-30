import { createPortal } from 'react-dom'

import usePortal from './hooks/usePortal'
import { IPortal } from './Portal.interface'

/**
 * @example
 * <Portal id="portal">
 *   <p>Thinking with portals</p>
 * </Portal>
 */
const Portal = ({ id, children }: IPortal) => {
  const target = usePortal(id)
  return createPortal(children, target)
}

export default Portal
