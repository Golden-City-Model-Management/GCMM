
import Layout from '@/components/layout/Layout'
import DashBoard from '@/components/dashboard/Dashboard'
import { useContext } from 'react'
import Box from '@mui/material/Box'
import { StoreContext } from 'reducers/store'

const layoutProps = {
  title: 'GCMM | Administration',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
}

const AdminHomePage = () => {

  const { state: { user: stateUser, ui: { boxPadding} }, } = useContext(StoreContext)

  return ( 
    <Layout {...layoutProps} > 
    <Box 
    display='flex' justifyContent='start' 
    alignItems='center' minHeight='80vh'  
    sx={{padding: {...boxPadding}}}
    >
      <DashBoard user={stateUser} />
    </Box>
    </Layout>
  )
} 

export default AdminHomePage 
