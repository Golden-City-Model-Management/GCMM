

import { NextPageWithLayout } from '@/types/pages'
import LayoutTwo from '@/components/layout/LayoutTwo'
import getLayout from '@/utils/pages/getLayout'

import ModelsDisplay from '@/utils/pages/modelsPages';

const MainBoard: NextPageWithLayout = () => <ModelsDisplay query='is_main_board=true' name='main board' />

const props = {
  title: 'Golden City Model Management | Main Board',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
  pad: true,
  canonical: `${process.env.BASE_URL}/main-board`
}

MainBoard.getLayout = getLayout(LayoutTwo, props)

export default MainBoard