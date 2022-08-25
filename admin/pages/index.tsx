
import getUserDetails from '@/utils/pages/getServerSideProps'
import Layout from '@/components/layout/Layout'
import DashBoard from '@/components/dashboard/Dashboard'
import { ReactNode, useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import { UIContext } from '@/context/ui'
import { UserContext } from '@/context/user'

const layoutProps = {
  title: 'Golden City Model Management | Administration',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
}

export const getServerSideProps = getUserDetails

const AdminHomePage = ({ user }: {
  children?: ReactNode,
  user: {
    _id: string,
    name: string,
    avatar: string,
    email: string,
    userName: string,
    role: string,
  }
}) => {

  const { boxPadding } = useContext(UIContext)
  const { updateUser } = useContext(UserContext)

  useEffect(() => {
    updateUser(user)
  }, [updateUser, user])
  console.log(user)
  
  return ( 
    <Layout {...layoutProps} > 
    <Box display='flex' justifyContent='center' 
    alignItems='flex-start' minHeight='80vh'  
    sx={{padding: {...boxPadding}}}>
      <DashBoard user={user} />
    </Box>
    </Layout>
  )
} 

export default AdminHomePage 
