




import { NextPageWithLayout } from '@/types/pages'
import LayoutOne from '@/components/layout/LayoutOne'
import getLayout from '@/utils/pages/getLayout'
import ComingSoonPlaceHolder from '@/components/common/ComingSoon'


const Careers: NextPageWithLayout = () => {

  return (
    <ComingSoonPlaceHolder page='Careers' />
  )
}

const props = {
  title: 'Golden City Model Management | Main Board',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
  pad: true,
}

Careers.getLayout = getLayout(LayoutOne, props)

export default Careers