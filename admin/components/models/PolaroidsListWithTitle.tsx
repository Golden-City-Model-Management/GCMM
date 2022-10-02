import * as React from 'react';
import List from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image'
import ImageListItemBar from '@mui/material/ImageListItemBar';
import * as styles from './style'
import Mapper from "../Mapper"
import { Image as ImageInterface } from '@/types/models';
import placeholderImg from '@/public/assets/images/placeholder.jpeg'
import Typography from '@mui/material/Typography';

const PolaroidImgWithTitle = ({img}: {
  img: {
    img: ImageInterface,
    title: string
  },
}) => {
  return (
    <ImageListItem>
    <Image
      src={`${img.img.secure_url || placeholderImg.src}`}
      alt={img.img.secure_url?.length <= 0 ? 'no image' : img.title}
      objectFit='contain'
      layout='fill'
      loading="lazy"
    />
    <ImageListItemBar
      sx={{ textAlign: 'center', textTransform: 'capitalize'}}
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
      ...styles.ImageListSx(theme),
      width: 'auto', height: 350, 
    })} cols={4} rowHeight={350}>
      <Mapper list={images} ComponentItem={PolaroidImgWithTitle} mapKey={'title'} itemProps={{}} itemName={'img'}  />
    </List>
  );
}