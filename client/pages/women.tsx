







import { NextPageWithLayout } from '@/types/pages'
import LayoutOne from '@/components/layout/LayoutOne'
import getLayout from '@/utils/pages/getLayout'
import ComingSoonPlaceHolder from '@/components/common/ComingSoon'


const Women: NextPageWithLayout = () => {

  return (
    <ComingSoonPlaceHolder page='Women' />
  )
}

const props = {
  title: 'Golden City Model Management | Main Board',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
  pad: true,
}

Women.getLayout = getLayout(LayoutOne, props)

export default Women