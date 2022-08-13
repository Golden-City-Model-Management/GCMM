

import AdminLayout from '@/components/layout/AdminLayout'

import { NextPageWithLayout } from '@/types/pages'
import getLayout from '@/utils/pages/getLayout'
import Box from '@mui/material/Box'

const AdminHomePage: NextPageWithLayout = () => {

  return (
    <Box> 
     Hello World
    </Box>
  )
} 

const props = {
  title: 'Golden City Model Management | Administration',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
}

AdminHomePage.getLayout = getLayout(AdminLayout, props)

export default AdminHomePage