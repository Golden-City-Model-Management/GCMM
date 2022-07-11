
import { LayoutProps } from '@/types/layout'
import Header from '@/components/header/Header'

const LayoutOne = ({ children }: LayoutProps) => {

  return (
    <>
      <Header showMenuBtnAlways={false} />
      {children}
    </>
  )
} 

export default LayoutOne