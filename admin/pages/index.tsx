
import getUserDetails from '@/utils/pages/getServerSideProps'
import Layout from '@/components/layout/Layout'
import { NextPage } from "next"

const layoutProps = {
  title: 'Golden City Model Management | Administration',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
}

const AdminHomePage: NextPage = (props) => {

  console.log('props')
  return ( 
    <Layout {...layoutProps} >  
      Log me in!!!!
    </Layout>
  )
} 

export default AdminHomePage 

export const getServerSideProps = getUserDetails