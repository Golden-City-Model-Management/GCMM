import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';

export default function MasonryImageList() {
  return (
    < >
      <ImageList sx={{ width: '100%', height: { xs: '100%', md: '74%' }, }}
        cols={2} gap={8} rowHeight={'auto'}>
        {itemData.map((item) => (
          <ImageListItem rows={1} cols={1} key={item.img}>
            <Image
              src={`${item.img}?w=248&auto=format`}
              objectPosition='center'
              layout='fill'
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

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
