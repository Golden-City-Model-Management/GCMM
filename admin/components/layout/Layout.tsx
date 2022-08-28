
import AdminLayoutHeader from '@/components/header/Header'
import { AdminNavigationDesktop } from '@/components/navigation/Nav'
import Box from '@mui/material/Box'
import { useContext } from 'react'
import { LayoutProps } from '@/types/layout'
import { UIContext } from '@/context/ui'
import Head from './Head'
import CustomizedBreadcrumbs from '@/components/common/breadcrumbs'
import { useRouter } from 'next/router'

const AdminLayout = ({ children, ...headProps }: LayoutProps) => {

  const router = useRouter()
  const paths = router.asPath.split('/').filter(x => x)
  const crumbs = paths.map(path => ({
    href: '/' + path, label: path, isActive: paths[paths.length - 1] === path
  }))

  const { fullHeightWithoutHeader } = useContext(UIContext)

  return (
    <Box sx={theme => ({
      position: 'relative',
      background: theme.palette.primary.main,
    })}>
      <Head {...headProps} />
      <AdminLayoutHeader />
      <AdminNavigationDesktop />
      <Box position='sticky' zIndex={3000} top='77px' sx={theme => ({
        background: theme.palette.primary.main,
      })}>
        <Box display='flex' maxWidth='88vw' mx='auto'
          padding='1rem'
          boxShadow='box-shadow: 0px 20px 20px #ffffff15' sx={{ background: '#000', }}>
          <CustomizedBreadcrumbs currentPath={router.asPath} crumbs={crumbs} />
        </Box>
      </Box>
      <Box
        sx={() => ({
          minHeight: fullHeightWithoutHeader,
        })}
        component='main' >
        {children}
      </Box>
    </Box>
  )
}

export default AdminLayout