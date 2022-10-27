



import Image, { StaticImageData } from 'next/image'
import NextLink from 'next/link'
import { useContext } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { StyledBorderBtn } from '@/components/common/Buttons'
import { UIContext } from '@/context/context'
import Carousel from '@/components/common/Carousel'
import IconButton from '@mui/material/IconButton'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const GalleryPreview = ({ images }: { images: { img: StaticImageData, title: string }[] }) => {

  const { containerPadLayout1, marginBtwContainers } = useContext(UIContext)

  return (
    <Box component='section' padding={containerPadLayout1} margin={`${marginBtwContainers} 0`}>

      <Typography component='h2' variant='caption' sx={{ textAlign: { md: 'left', xs: 'center' } }}>
        <Typography
          color={(theme) => (theme.palette.secondary.main)}
          variant='caption'
          component='span'>Talent</Typography> at its finest
      </Typography>

      <Box sx={(theme) => ({
        margin: '50px 0',
        border: `1px solid ${theme.palette.secondary.main}`,
        boxShadow: '0 0 30px 3px #0d0d0d, inset 0 0 30px 3px #ffd7001a',
        borderLeft: 0,
        borderRight: 0,
        borderRadius: '50px',
        color: 'red'
      })}>
        <Carousel items={
          images.map(img => (
            <Box key={img.title} position='relative'
              maxHeight='68vh' height={img.img.height} mt={2}
              width='80%' maxWidth={img.img.width} mx='auto' >
              <Image alt='Gallery' src={img.img.src} layout='fill' objectFit='contain' />
            </Box>
          ))
        } animation='slide' stopAutoPlayOnHover navButtonsAlwaysVisible />
      </Box>

      <Box sx={{ display: { md: 'block', xs: 'flex' }, justifyContent: 'center' }}>
        <NextLink href='/gallery' passHref>
          <StyledBorderBtn>
            explore gallery
          </StyledBorderBtn>
        </NextLink>
      </Box>
    </Box>
  )
}


export default GalleryPreview