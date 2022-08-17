
import AdminLayoutHeader from '@/components/header/Header'
import { AdminNavigationDesktop } from '@/components/navigation/Nav'
import Box from '@mui/material/Box'
import { useContext } from 'react'
import { LayoutProps } from '@/types/layout'
import { UIContext } from '@/context/ui'
import Head from './Head'

const AdminLayout = ({ children, ...headProps }: LayoutProps) => {
  const { fullHeightWithoutHeader } = useContext(UIContext)

  return (
    <Box sx={theme => ({
      position: 'relative', 
      background: theme.palette.primary.main,
    })}>
    <Head {...headProps} />
    <AdminLayoutHeader avatar={{ src: '', alt: ''}}/>
    <AdminNavigationDesktop />
    <Box
     sx={(theme) => ({
      minHeight: fullHeightWithoutHeader,
      background: theme.palette.primary.main,
     })}
     component='main' >
      {children}
    </Box>
  </Box>
  )
}

export default AdminLayout