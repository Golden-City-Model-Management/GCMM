 

import { LayoutProps } from '@/types/layout'
import Header from '@/components/header/Header'
import Box from '@mui/material/Box'
import Head from './Head'
import Footer from '@/components/footer/Footer'
import { UIContext } from '@/context/context'
import { useContext } from 'react'

const LayoutWithMenuBtnAlways = ({ children, ...headProps }: LayoutProps) => {
  const { fullHeightWithoutHeader, layout2ContainerPad } = useContext(UIContext)
 
  return (
    <>
      <Head {...headProps} />
      <Header showMenuBtnAlways={true} />
      <Box component='main' minHeight={fullHeightWithoutHeader} padding={layout2ContainerPad} >
        {children}
      </Box>
      <Footer />      
    </>
  )
} 

export default LayoutWithMenuBtnAlways