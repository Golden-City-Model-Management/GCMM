 

import { useContext } from 'react'
import { LayoutProps } from '@/types/layout'
import { UIContext } from '@/context/context'
import Box from '@mui/material/Box'
import Head from './Head'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import Lightbox from '@/components/common/Lightbox';

const LayoutWithFixedNavInDesktop = ({ children, pad, ...headProps }: LayoutProps & { pad?: boolean}) => {

  const { bodyWidth, fullHeightWithoutHeader, containerPadLayout1, modal, closeModal } = useContext(UIContext)
  return (
    <>
      <Header showMenuBtnAlways={false} />
      <Head {...headProps} />
      <Box
       sx={(theme) => ({
        borderRight: { lg: `2px solid ${theme.palette.secondary.light}`},
        minHeight: fullHeightWithoutHeader,
        background: theme.palette.primary.main,
        padding: pad ? containerPadLayout1 : '',
        width: { lg: bodyWidth},
       })}
       component='main' >
        {children}
      </Box>
      <Box sx={{ width: { lg: bodyWidth}}}>
        <Footer layout={1} />      
      </Box>
      <Lightbox open={modal.open} handleClose={closeModal}>{modal.content}</Lightbox>
    </>
  )
} 

export default LayoutWithFixedNavInDesktop