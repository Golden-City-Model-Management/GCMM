
import { useContext, useState } from 'react'
import { UIContext } from '@/context/context'
import { StyledBorderBtn } from '@/components/common/Buttons'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { WithNextLink } from '@/components/common/Links'
import { heroLinks } from '@/constants/links'
import Bg5 from '@/public/assets/images/BG-05.jpg'



const Hero = () => {

  const { fullHeightWithoutHeader, universalContainerPadding } = useContext(UIContext)

  const bgElementSx = () => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundPosition: 'center',
    backgroundSize: {
      xs: 'cover',
      md: 'contain',
    },
    transition: 'all .5s ease-in'
  })
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      minHeight: fullHeightWithoutHeader,
      position: 'relative',
      background: ` url(${Bg5.src}), url(${Bg5.blurDataURL})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      transition: 'all .45 ease-in',
    }}>
      <Box sx={() => ({
        ...bgElementSx(),
        background: `url(${Bg5.src}), url(${Bg5.blurDataURL})`,
        opacity: '.1'
      })} />

      <Box sx={{
        zIndex: 2,
        background: '#191919bf',
        transition: 'all .5s ease-in',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        position: 'relative',
        minHeight: fullHeightWithoutHeader,
        padding: universalContainerPadding,
      }}>
        <Typography
          component='h1'
          variant='caption'
          mb='25px'
          sx={{
            fontWeight: '700',
            fontSize: '4rem'
          }}
        >
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: '4rem'
            }}
            variant='caption'
            color={(theme) => theme.palette.text.secondary}>
            Golden</Typography>City <div />
          Model Management
        </Typography>
        <Box
          sx={{ display: 'flex', gap: '25px' }}
          data-testid='hero-cta'
        >
          {
            heroLinks.map(link => (
              <WithNextLink key={link.to} href={link.to} passHref>
                <StyledBorderBtn>
                  {link.name}
                </StyledBorderBtn>
              </WithNextLink>
            ))
          }
        </Box>
      </Box>
    </Box>
  )
}


export default Hero
