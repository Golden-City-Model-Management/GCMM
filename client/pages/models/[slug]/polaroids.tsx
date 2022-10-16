import { NextPageWithLayout } from "@/types/pages";
import getLayout from "@/utils/pages/getLayout";
import LayoutWithMenuBtnAlways from "@/components/layout/LayoutTwo";

const Polaroids: NextPageWithLayout =  () => {

  return(
  <>
  Hello world
  </>
  )
}

const layoutProps = {
  title: 'Polaroids | GCMM',
  description: 'Polaroids | GCMM'
}
Polaroids.getLayout = getLayout(LayoutWithMenuBtnAlways, layoutProps)
export default Polaroids