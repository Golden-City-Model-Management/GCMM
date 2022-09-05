import * as React from 'react';
import List from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image'
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function PolaroidsListWithTitle({ images }: {
  images: {
    title: string,
    img: string
  }[]
}) {
  return (
    <List sx={theme => ({ 
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr) !important'
       },
       [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, 1fr) !important'
       },
      width: 'auto', height: 350, 
    })} cols={4} rowHeight={350}>
      {images.map((img, idx) => (
        <ImageListItem key={idx}>
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
      ))}
    </List>
  );
}