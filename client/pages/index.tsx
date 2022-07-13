
import { NextPageWithLayout } from '@/types/pages'
import LayoutTwo from '@/components/layout/LayoutTwo'
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

Home.getLayout = getLayout(LayoutTwo, props)

export default Home
 