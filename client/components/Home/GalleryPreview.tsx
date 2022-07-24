



import { useContext } from 'react'
import { UIContext } from '@/context/ui'
import NextLink from 'next/link'
import { StyledBorderBtn } from '@/components/common/Buttons'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Carousel from '@/components/common/Carousel'
import { StaticImageData } from 'next/image'

const GalleryPreview = ({images}:{images: { img: StaticImageData, title: string }[]}) => { 

  const { universalContainerPadding, marginBtwContainers } = useContext(UIContext)

  return (
    <Box component='section' data-testid='gallery-preview'
    sx={{padding: universalContainerPadding, margin: `${marginBtwContainers} 0`,}}>

      <Typography component='h2' variant='caption' sx={{textAlign: { md: 'left', xs: 'center'}}}>
         <Typography 
         color={(theme) => (theme.palette.secondary.main)} 
         variant='caption' 
         component='span'>Talent</Typography> at its finest
      </Typography>

      <Box sx={(theme) =>({
        margin: '50px 0',
        border: `1px solid ${theme.palette.secondary.main}`,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: '50px'
      })}>
      <Carousel images={images} width={'80vw'} height={'60vh'} />
      </Box>
      
      <Box sx={{display: { md: 'block', xs: 'flex'}, justifyContent: 'center'}}>
      <NextLink href='/gallery' passHref>
        <StyledBorderBtn data-testid='gallery-preview-link'>
          Explore Gallery
        </StyledBorderBtn>
      </NextLink>
      </Box>

    </Box>
  )
}


export default GalleryPreview