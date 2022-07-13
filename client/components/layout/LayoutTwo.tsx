 

import { LayoutProps } from '@/types/layout'
import Header from '@/components/header/Header'

const LayoutWithMenuBtnAlways = ({ children }: LayoutProps) => {

  return (
    <>
      <Header showMenuBtnAlways={true} />
      {children}
    </>
  )
} 

export default LayoutWithMenuBtnAlways