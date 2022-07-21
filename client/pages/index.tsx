

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
  pageTitle: 'Hello',
  children: <></>
}

Home.getLayout = getLayout(LayoutOne, props)

export default Home
 