

import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

const Carousel = ({ images, }: {
  images: {
    img: string,
    title: string,
  }[],
}) => {

  return(
    <ImageList data-testid='carousel'>

    </ImageList>
  )
}

export default Carousel


/*      {
        images.map(item => (
          <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
        ))
      }*/