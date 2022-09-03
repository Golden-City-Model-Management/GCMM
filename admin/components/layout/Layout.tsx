
import AdminLayoutHeader from '@/components/header/Header'
import Box from '@mui/material/Box'
import { LayoutProps } from '@/types/layout'
import Head from './Head'
import CustomizedBreadcrumbs from '@/components/common/breadcrumbs'
import { useRouter } from 'next/router'

const AdminLayout = ({ children, ...headProps }: LayoutProps) => {

  const router = useRouter()
  const paths = router.asPath.split('/').filter(x => x)
  const crumbs = paths.map(path => ({
    href: '/' + path, label: path.split('?')[0] , isActive: paths[paths.length - 1]=== path
  }))

  return (
    <Box position='relative' sx={theme => ({
      background: theme.palette.primary.main,
    })}>
      <Head {...headProps} />
      <AdminLayoutHeader />
      <Box position='sticky' top='77px' zIndex={200} sx={theme => ({
        background: theme.palette.primary.main,
      })}>
        <Box display='flex' maxWidth='88vw' mx='auto'
          padding='1rem' boxShadow='box-shadow: 0px 20px 20px #ffffff15' sx={{ background: '#00000052', }}>
          <CustomizedBreadcrumbs currentPath={router.asPath} crumbs={crumbs} />
        </Box>
      </Box>
      <Box  component='main' >
        {children}
      </Box>
    </Box>
  )
}

export default AdminLayout