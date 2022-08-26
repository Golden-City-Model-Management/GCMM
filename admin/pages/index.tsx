
import getUserDetails from '@/utils/pages/getServerSideProps'
import Layout from '@/components/layout/Layout'
import DashBoard from '@/components/dashboard/Dashboard'
import { ReactNode, useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import { UIContext } from '@/context/ui'
import { UserContext, User } from '@/context/user'
import { useRouter } from 'next/router'

const layoutProps = {
  title: 'Golden City Model Management | Administration',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
}

export const getServerSideProps = getUserDetails

const AdminHomePage = ({ user }: {
  children?: ReactNode,
  user: User | undefined
}) => {

  const router = useRouter()
  const { boxPadding } = useContext(UIContext)
  const { updateUser, user: state } = useContext(UserContext)

  useEffect(() => {
    if(user === undefined){
      router.push('/error?error=An error occurred! Please try again')
    }else{
      updateUser(user) 
    }
  }, [updateUser, user, router])

  return ( 
    <Layout {...layoutProps} > 
    <Box 
    display='flex' justifyContent='start' 
    alignItems='center' minHeight='80vh'  
    sx={{padding: {...boxPadding}}}
    >
      <DashBoard user={state} />
    </Box>
    </Layout>
  )
} 

export default AdminHomePage 
