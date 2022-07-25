 

import { useContext } from 'react'
import { LayoutProps } from '@/types/layout'
import { UIContext } from '@/context/ui'
import Box from '@mui/material/Box'
import Head from './Head'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

const LayoutWithFixedNavInDesktop = ({ children, pad, ...headProps }: LayoutProps & { pad?: boolean}) => {

  const { bodyWidth, fullHeightWithoutHeader, universalContainerPadding } = useContext(UIContext)
  return (
    <Box sx={{width: { lg: bodyWidth}}}>
      <Header showMenuBtnAlways={false} />
      <Head {...headProps} />
      <Box
       sx={(theme) => ({
        borderRight: { lg: `2px solid ${theme.palette.secondary.light}`},
        minHeight: fullHeightWithoutHeader,
        background: theme.palette.primary.main,
        padding: pad ? universalContainerPadding : ''
       })}
       component='main' >
        {children}
      </Box>
      <Footer />      
    </Box>
  )
} 

export default LayoutWithFixedNavInDesktop