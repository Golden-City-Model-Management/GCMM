import MUICarousel from 'react-material-ui-carousel'
import  { CarouselProps } from 'react-material-ui-carousel/dist/components/types'

export default function Carousel({ items, ...rest }: {
  items: any[]
} & CarouselProps) {
  return (
    <MUICarousel {...rest}>
      {items}
    </MUICarousel>
  )
}
