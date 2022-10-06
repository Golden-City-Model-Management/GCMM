import * as React from 'react';
import List from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image'
import ImageListItemBar from '@mui/material/ImageListItemBar';
import * as styles from '../style'
import Mapper from "../../Mapper"
import { Image as ImageInterface } from '@/types/models';
import placeholderImg from '@/public/assets/images/placeholder.jpeg'

const PolaroidImgWithTitle = ({ img }: {
  img: {
    img: ImageInterface,
    title: string
  },
}) => {
  return (
    <ImageListItem sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image
        src={`${img.img.secure_url || placeholderImg.src}`}
        alt={img.img.secure_url?.length <= 0 ? 'no image' : img.title}
        objectFit='contain'
        width={img.img.width || '100%'}
        height={img.img.height || '100%'}
        loading="lazy"
      />
      <ImageListItemBar
        sx={{ textAlign: 'center', textTransform: 'capitalize' }}
        title={img.title}
      />
    </ImageListItem>
  )
}

export default function PolaroidsListWithTitle({ images }: {
  images: {
    title: string,
    img: string
  }[]
}) {
  return (
    <List sx={theme => ({
      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      padding: { xs: '1rem', md: '2rem 1.5rem', lg: '1rem 2rem' }
    })} rowHeight={350}>
      <Mapper list={images} ComponentItem={PolaroidImgWithTitle} mapKey={'title'} itemProps={{}} itemName={'img'} />
    </List>
  );
}