


import { NextPageWithLayout } from '@/types/pages'
import LayoutTwo from '@/components/layout/LayoutTwo'
import getLayout from '@/utils/pages/getLayout'
import ModelsDisplay from '@/utils/pages/infiniteScrolling'
import GalleryImage from '@/components/gallery/GalleryImage'

const Gallery: NextPageWithLayout = () => <ModelsDisplay ListItem={GalleryImage} 
pathAndQuery='/gallery?x=y' name='gallery' />

const props = {
  title: 'Golden City Model Management | Main Board',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
  pad: true,
  canonical: `${process.env.BASE_URL}/gallery`
}

Gallery.getLayout = getLayout(LayoutTwo, props)

export default Gallery