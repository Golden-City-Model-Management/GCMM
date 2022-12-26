
import { NextPageWithLayout } from "@/types/pages"
import { useRouter } from "next/router"
import { useMemo } from "react"
import LayoutWithMenuBtnAlways from "@/components/layout/LayoutTwo"
import getLayout from "@/utils/pages/getLayout"
import { parseParam } from "@/utils/pages/params"
import InfiniteScroller  from '@/utils/pages/infiniteScrolling'
import GalleryImage from '@/components/gallery/GalleryImage'

const PortfolioPage: NextPageWithLayout = ({ portfolio }: {
  [x:string]: any
}) => {

  const { query } = useRouter()
  const slug = useMemo(() => parseParam(query?.slug), [query])

  return (
  <InfiniteScroller name={`Portfolio - ${slug?.split('-').join(' ')}`} 
    onEmptyMsg={`${slug?.split('-').join(' ')}'s portfolio will be updated soon...`}
    pathAndQuery={`/portfolios?model_slug=${slug}`} ListItem={(props: {[x: string]: any}) =>
     <GalleryImage component='li' item={props.item.image} />} />
  )
}
const layoutProps = {
  title: 'Portfolio',
  description: 'Portfolio Images'
}

PortfolioPage.getLayout = getLayout(LayoutWithMenuBtnAlways, layoutProps)
export default PortfolioPage