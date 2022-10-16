

import { LayoutProps } from '@/types/layout'
import Header from '@/components/header/Header'
import Box from '@mui/material/Box'
import Head from './Head'
import Footer from '@/components/footer/Footer'
import { UIContext } from '@/context/context'
import { useContext } from 'react'
import CustomizedBreadcrumbs from '../common/breadcrumbs'
import { useRouter } from 'next/router'

const LayoutWithMenuBtnAlways = ({ children, ...headProps }: LayoutProps) => {
  const { fullHeightWithoutHeader, layout2ContainerPad, } = useContext(UIContext)
  const router = useRouter()
  const paths = router.asPath.split('/').filter(x => x)
  const crumbs = paths.map((path, idx) => {
    return ({
      href: `/${paths.slice(0, idx + 1).join('/')}`,
      label: path.split('?')[0], isActive: paths[paths.length - 1] === path
    })
  })
  return (
    <>
      <Head {...headProps} />
      <Header showMenuBtnAlways={true} />
      <Box component='main' minHeight={fullHeightWithoutHeader} padding={layout2ContainerPad} >
        <Box component='div' px={3} py={2} bgcolor={t => t.palette.primary.light}
        zIndex={t => t.zIndex.appBar - 1} 
        position='sticky' top={'89px'}>
          <CustomizedBreadcrumbs crumbs={crumbs} currentPath={router.asPath} />
        </Box>
        {children}
      </Box>
      <Footer layout={2} />
    </>
  )
}

export default LayoutWithMenuBtnAlways