import { ITab } from './Tab.interface'

const Tab = ({ children, className }: ITab) => {
  return <div className={className}>{children}</div>
}

export default Tab
