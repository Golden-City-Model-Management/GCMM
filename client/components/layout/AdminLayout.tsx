
import AdminLayoutHeader from '@/components/header/AdminLayoutHeader'
import { AdminNavigationDesktop } from '@/components/navigation/AdminNav'
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
      background: theme.adminPalette.main,
    })}>
    <Head {...headProps} />
    <AdminLayoutHeader avatar={{ src: '', alt: ''}}/>
    <AdminNavigationDesktop />
    <Box
     sx={(theme) => ({
      minHeight: fullHeightWithoutHeader,
      background: theme.adminPalette.main,
     })}
     component='main' >
      {children}
    </Box>
  </Box>
  )
}

export default AdminLayout