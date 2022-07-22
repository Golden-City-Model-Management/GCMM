

import { NextPageWithLayout } from '@/types/pages'
import LayoutOne from '@/components/layout/LayoutOne'
import getLayout from '@/utils/pages/getLayout'
import Hero from '@/components/Home/Hero'
import Box from '@mui/material/Box'

const Home: NextPageWithLayout = () => {

  return (
    <Box> 
      <Hero />
    </Box>
  )
} 

const props = {
  title: 'Golden City Model Management',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
}

Home.getLayout = getLayout(LayoutOne, props)

export default Home
 