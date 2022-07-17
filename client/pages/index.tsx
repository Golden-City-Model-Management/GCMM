
import { NextPageWithLayout } from '@/types/pages'
import LayoutOne from '@/components/layout/LayoutOne'
import getLayout from '@/utils/pages/getLayout'

const Home: NextPageWithLayout = () => {


  return (
    <> 
      Hello world 
    </>
  )
} 

const props = {
  pageTitle: 'Hello',
  children: <></>
}

Home.getLayout = getLayout(LayoutOne, props)

export default Home
 