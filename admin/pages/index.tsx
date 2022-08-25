
import getUserDetails from '@/utils/pages/getServerSideProps'
import Layout from '@/components/layout/Layout'
import { NextPage } from "next"
import { ReactNode } from 'react'

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
      19182f7d
    </Layout>
  )
} 

export default AdminHomePage 
