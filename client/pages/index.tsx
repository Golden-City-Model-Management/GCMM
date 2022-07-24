

import { NextPageWithLayout } from '@/types/pages'
import LayoutOne from '@/components/layout/LayoutOne'
import getLayout from '@/utils/pages/getLayout'
import Hero from '@/components/Home/Hero'
import GalleryPreview from '@/components/Home/GalleryPreview'
import Footer from '@/components/footer/Footer'
import Box from '@mui/material/Box'

import Bg1 from '@/public/assets/images/BG-01.jpg'
import Bg2 from '@/public/assets/images/BG-02.jpg'
import Bg3 from '@/public/assets/images/BG-03.jpg'
import Bg5 from '@/public/assets/images/BG-05.jpg'  
import Bg6 from '@/public/assets/images/BG-06.jpg'
import Bg7 from '@/public/assets/images/BG-07.jpg'

const images = [ {img: Bg1, title: 'bg1'}, {img: Bg2, title: 'bg2'}, {img: Bg3, title: 'bg3'}, {img: Bg5, title: 'bg5'}, {img: Bg6, title: 'bg6'}, {img: Bg7, title: 'bg7'},]

const Home: NextPageWithLayout = () => {

  return (
    <Box> 
      <Hero />
      <GalleryPreview images={images}/>
      <Footer />
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
 