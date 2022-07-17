 

import { LayoutProps } from '@/types/layout'
import Header from '@/components/header/Header'
import Box from '@mui/material/Box'

const LayoutWithMenuBtnAlways = ({ children }: LayoutProps) => {

  return (
    <>
      <Header showMenuBtnAlways={true} />
      <Box component='main' >
        {children}
      </Box>
    </>
  )
} 

export default LayoutWithMenuBtnAlways