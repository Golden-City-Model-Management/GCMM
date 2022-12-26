

import { LayoutProps } from '@/types/layout'
import Header from '@/components/header/Header'
import Box from '@mui/material/Box'
import Head from './Head'
import Footer from '@/components/footer/Footer'
import { UIContext } from '@/context/context'
import { useContext } from 'react'
import Lightbox from '@/components/common/Lightbox';
import dynamic from 'next/dynamic'

const CustomizedBreadcrumbs = dynamic(() => import('@/components/common/breadcrumbs'), { ssr: false })
const LayoutWithMenuBtnAlways = ({ children, ...headProps }: LayoutProps) => {
  const { fullHeightWithoutHeader, layout2ContainerPad, modal, closeModal  } = useContext(UIContext)
  return (
    <>
      <Head {...headProps} />
      <Header showMenuBtnAlways={true} />
      <Box component='main' minHeight={fullHeightWithoutHeader} padding={layout2ContainerPad} >
        <Box component='div' px={3} py={2} bgcolor={t => t.palette.primary.light}
        zIndex={t => t.zIndex.appBar - 1} 
        position='sticky' top={'89px'}>
          <CustomizedBreadcrumbs />
        </Box>
        {children}
      </Box>
      <Footer layout={2} />
      <Lightbox open={modal.open} handleClose={closeModal}>{modal.content}</Lightbox>
    </>
  )
}

export default LayoutWithMenuBtnAlways