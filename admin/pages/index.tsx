
import useLogin from '@/utils/pages/useLogin'
import Layout from '@/components/layout/Layout'
import DashBoard from '@/components/dashboard/Dashboard'
import { useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { StoreContext } from 'reducers/store'
import useUser from '@/utils/pages/useUser'

const layoutProps = {
  title: 'Golden City Model Management | Administration',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
}

const AdminHomePage = () => {

  const router = useRouter() 
  useLogin({redirectIfFound: false, redirectTo: '/login'})
  const { state: { user: stateUser, ui: { boxPadding} }, combinedDispatch: { userDispatch } } = useContext(StoreContext)
  const { user } = useUser({redirectTo: '/'})

  useEffect(() => {
    userDispatch({type: 'UPDATE_USER', payload: user})
  }, [router, user, userDispatch])

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
