 

import { LayoutProps } from '@/types/layout'
import Header from '@/components/header/Header'
import Box from '@mui/material/Box'

const LayoutWithFixedNavInDesktop = ({ children }: LayoutProps) => {

  return (
    <>
      <Header showMenuBtnAlways={false} />
      <Box component='main' >
        {children}
      </Box>
    </>
  )
} 

export default LayoutWithFixedNavInDesktop