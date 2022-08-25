
import getUserDetails from '@/utils/pages/getServerSideProps'
import Layout from '@/components/layout/Layout'
import DashBoard from '@/components/dashboard/Dashboard'
import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { padded, display, layout } from '@/styles/styles'

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

  return ( 
    <Layout {...layoutProps} > 
    <Box sx={{
      display: display.flex,
      justifyContent: layout.start,
      alignItems: layout.center,
      minHeight: '80vh',
      padding: {
        lg: '0 55px',
        md: padded().lg['padding'],
        xs: padded().sm['padding'],
      },
    }}>
      <DashBoard user={user} />
    </Box>
    </Layout>
  )
} 

export default AdminHomePage 
