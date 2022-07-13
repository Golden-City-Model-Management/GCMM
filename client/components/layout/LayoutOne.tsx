 

import { LayoutProps } from '@/types/layout'
import Header from '@/components/header/Header'

const LayoutWithFixedNavInDesktop = ({ children }: LayoutProps) => {

  return (
    <>
      <Header showMenuBtnAlways={false} />
      {children}
    </>
  )
} 

export default LayoutWithFixedNavInDesktop