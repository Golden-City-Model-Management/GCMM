

import { NextPageWithLayout } from '@/types/pages'
import LayoutTwo from '@/components/layout/LayoutTwo'
import getLayout from '@/utils/pages/getLayout'
import ModelsDisplay from '@/utils/pages/infiniteScrolling';
import ModelCard from '@/components/models/ModelCard';

const MainBoard: NextPageWithLayout = () => <ModelsDisplay
 ListItem={({item}: {[x:string]: any}) => <ModelCard  component='li' item={item} parentRoute='main-board'/>} 
pathAndQuery='/models?is_main_board=true' name='main board' />

const props = {
  title: 'Golden City Model Management | Main Board',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
  pad: true,
  canonical: `${process.env.BASE_URL}/main-board`
}

MainBoard.getLayout = getLayout(LayoutTwo, props)

export default MainBoard