

import AdminLayout from '@/components/layout/Layout'

import { NextPageWithLayout } from '@/types/pages'
import getLayout from '@/utils/pages/getLayout'
import Box from '@mui/material/Box'

const AdminHomePage: NextPageWithLayout = (props) => {

  console.log('props')
  return ( 
    <Box>  
      Log me in!!!!
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