 

import { LayoutProps } from '@/types/layout'
import Header from '@/components/header/Header'
import Box from '@mui/material/Box'
import Head from './Head'
import Footer from '@/components/footer/Footer'

const LayoutWithMenuBtnAlways = ({ children, ...headProps }: LayoutProps) => {

  return (
    <>
      <Head {...headProps} />
      <Header showMenuBtnAlways={true} />
      <Box component='main' >
        {children}
      </Box>
      <Footer />      
    </>
  )
} 

export default LayoutWithMenuBtnAlways