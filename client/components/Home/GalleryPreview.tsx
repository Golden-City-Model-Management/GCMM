

import NextLink from 'next/link'
import { StyledBorderBtn } from '@/components/common/Buttons'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const GalleryPreview = () => {

  return (
    <Box component='section' data-testid='gallery-preview'>
      <Typography component='h2' variant='h2'>
         Talent at its finest
      </Typography>
      <NextLink href='/gallery' passHref>
        <StyledBorderBtn data-testid='gallery-preview-link'>
          Gallery
        </StyledBorderBtn>
      </NextLink>
    </Box>
  )
}


export default GalleryPreview