import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import { Polaroids } from '@/types/models';

const PolaroidsList = ({ polaroids }: {
  polaroids: Polaroids
}) => {

  return (
    <>
      <ImageList  sx={{ width: '100%', height: '70%', margin: '0 auto' }}
        cols={2} gap={18} rowHeight={'auto'}>
        {Object.keys(polaroids).map((key: string) => (
          key === '_id' ? null : 
          <ImageListItem rows={1} cols={1} key={key} sx={t => ({ border: `1px solid ${t.palette.primary.dark}`})}>
            <Image
              src={`${polaroids[key as keyof Polaroids]}`}
              objectPosition='center'
              objectFit='contain'
              layout='fill'
              alt={key.split('_').join(' ')}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

export default PolaroidsList

const itemData = [

  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
];
