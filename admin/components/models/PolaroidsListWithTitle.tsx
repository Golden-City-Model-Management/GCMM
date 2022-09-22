import * as React from 'react';
import List from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image'
import ImageListItemBar from '@mui/material/ImageListItemBar';
import * as styles from './style'
import Mapper from "../Mapper"


const PolaroidImgWithTitle = ({img}: {
  img: {
    img: string,
    title: string
  },
}) => {
  return (
    <ImageListItem>
    <Image
      src={`${img.img}`}
      alt={''}
      objectFit='contain'
      layout='fill'
      loading="lazy"
    />
    <ImageListItemBar
      sx={{ textAlign: 'center'}}
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