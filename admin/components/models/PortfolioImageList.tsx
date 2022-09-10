import { useState, useCallback } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image'
import { ImageListSx } from '@/components/models/style'
import { Portfolio } from '@/types/models';


const PortfolioImage = ({ img, handleSelect }: {
  img: Portfolio,
  handleSelect: (id: string) => void
}) => {
  const handleContextMenu = useCallback((e) => {
    e.preventDefault()
   let shouldDeleteImg = confirm('Do you want delete this image')
   if(shouldDeleteImg){
     handleSelect(e.target.id)
   }
  }, [handleSelect])

  return (
    <ImageListItem key={img._id}>
      <Image
        id={img._id}
        onContextMenu={handleContextMenu}
        layout='fill'
        src={`${img.image}`}
        alt=''
        loading="lazy"
      />
    </ImageListItem>
  )
}

export default function PortfolioImageList({ images }: {
  images: Portfolio[]
}) {
  const handleSelect = useCallback((id: string) => {
    console.log(id)
  }, [])
  return (
    <ImageList sx={theme => ({ ...ImageListSx(theme), width: '100%', height: '100%' })} cols={3} rowHeight={500}>
      {images.map((img) => { return (<PortfolioImage handleSelect={handleSelect} key={img._id} img={img} />)})}
    </ImageList>
  );
}
