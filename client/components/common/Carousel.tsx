import MUICarousel from 'react-material-ui-carousel'
import  { CarouselProps } from 'react-material-ui-carousel/dist/components/types'

export default function Carousel({ items,  }: {
  items: any[]
} & CarouselProps) {
  return (
    <MUICarousel>
      {items}
    </MUICarousel>
  )
}
