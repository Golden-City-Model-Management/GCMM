import { useState, useCallback, useMemo } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image'
import { ImageListSx } from '@/components/models/style'
import { Portfolio } from '@/types/models';
import Lightbox from '../Lightbox';
import Box from '@mui/material/Box';
import PlaceholderImg from '@/public/assets/images/placeholder.jpeg'
import Button from '@mui/material/Button'
const PortfolioImage = ({ img, handleSelect }: {
  img: Portfolio,
  handleSelect: (id: string) => void,
}) => {  
  const handleContextMenu = useCallback((e) => {
    e.preventDefault() 
    handleSelect(e.target.id)
  }, [handleSelect])

  return (
    <ImageListItem key={img._id}>
      <Image
        id={img._id}
        onDoubleClick={handleContextMenu}
        onContextMenu={handleContextMenu}
        layout='fill'
        src={`${img.image.secure_url}`}
        alt=''
        loading="lazy"
      />
    </ImageListItem>
  )
}

export default function PortfolioImageList({ images }: {
  images: Portfolio[]
}) {
  const [imageInFocus, setImageInFocus] = useState('')
  const focusedImageData = useMemo(() => images.find(img => img._id === imageInFocus), [imageInFocus, images])
  
  const focusImage = useCallback((id: string) => {
    setImageInFocus(id)
  }, [])
  return (
    <>
    <ImageList sx={theme => ({ ...ImageListSx(theme), width: '100%', height: '100%' })} cols={3} rowHeight={500}>
      {images.map((img) => { return (<PortfolioImage handleSelect={focusImage} key={img._id} img={img} />)})}
    </ImageList>
    <Lightbox isOpen={imageInFocus.length > 0} title='' close={() => setImageInFocus('')} showCloseBtn >
      <Box position='absolute' width='90%' height='80%'
       top='10%' display='grid' gridTemplateRows={'80% 20%'} gridTemplateColumns={'1fr'}>
        <Box position='relative' gridRow={'1/2'} gridColumn={'1/2'} >
          <Image src={focusedImageData?.image.secure_url || PlaceholderImg.src} alt='' 
            layout='fill' objectFit='contain'
          />
        </Box>
        <Box display='flex' justifyContent='space-around' alignItems='center'>
         <Button href={focusedImageData?.image.secure_url || '/'} target='_blank' rel="noreferrer" color='inherit' size='small' variant='outlined'>
          Open Preview  
         </Button>
        </Box>
      </Box>
    </Lightbox>
    </>
  );
}
