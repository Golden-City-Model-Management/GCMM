




import { NextPageWithLayout } from '@/types/pages'
import LayoutTwo from '@/components/layout/LayoutTwo'
import getLayout from '@/utils/pages/getLayout'
import ModelsDisplay from '@/utils/pages/infiniteScrolling';
import ModelCard from '@/components/models/ModelCard';

const NewFaces: NextPageWithLayout = () => <ModelsDisplay
ListItem={({item}: {[x:string]: any}) => <ModelCard  component='li' item={item} parentRoute='new-faces'/>} 
pathAndQuery='/models?is_new_face=true' name='new faces' />

const props = {
  title: 'Golden City Model Management | Main Board',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
  pad: true,
  canonical: `${process.env.BASE_URL}/new-faces`
}

NewFaces.getLayout = getLayout(LayoutTwo, props)

export default NewFaces