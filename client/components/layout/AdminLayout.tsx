
import AdminLayoutHeader from '@/components/header/AdminLayoutHeader'
import Box from '@mui/material/Box'
import { useContext } from 'react'
import { LayoutProps } from '@/types/layout'
import { UIContext } from '@/context/ui'
import Head from './Head'

const AdminLayout = ({ children, ...headProps }: LayoutProps) => {
  const { bodyWidth, fullHeightWithoutHeader, universalContainerPadding } = useContext(UIContext)

  return (
    <>
    <AdminLayoutHeader avatar={{ src: '', alt: ''}}/>
    <Head {...headProps} />
    <Box
     sx={(theme) => ({
      borderRight: { lg: `2px solid ${theme.palette.secondary.light}`},
      minHeight: fullHeightWithoutHeader,
      background: theme.palette.primary.main,
      padding: universalContainerPadding,
      width: { lg: bodyWidth},
     })}
     component='main' >
      {children}
    </Box>
    <Box sx={{ width: { lg: bodyWidth}}}>
    </Box>
  </>
  )
}

export default AdminLayout