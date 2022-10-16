
import { NextPageWithLayout } from '@/types/pages'
import LayoutTwo from '@/components/layout/LayoutTwo'
import getLayout from '@/utils/pages/getLayout'
import ModelsDisplay from '@/utils/pages/infiniteScrolling';
import ModelCard from '@/components/models/ModelCard';

const Men: NextPageWithLayout = () => <ModelsDisplay 
ListItem={({item}: {[x:string]: any}) => <ModelCard  component='li' item={item} parentRoute='men'/>} 
pathAndQuery='/models?gender=male' name='men' />

const props = {
  title: 'Golden City Model Management | Men',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/logo.svg',
  pad: true,
  canonical: `${process.env.BASE_URL}/men`
}

Men.getLayout = getLayout(LayoutTwo, props)

export default Men