
import { useContext, useState } from 'react'
import { UIContext } from '@/context/ui'
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
        // clipPath: 'polygon(0% 0%, 10% 0%, 10% 100%, 20% 100%, 20% 0%, 30% 0%, 30% 100%, 40% 100%, 40% 0%, 50% 0%, 50% 100%, 60% 100%, 60% 0%, 70% 0%, 70% 100%, 80% 100%, 80% 0%, 90% 0%, 90% 100%, 100% 100%, 100% 0%, 100% 10%, 0% 10%, 0% 20%, 100% 20%, 100% 30%, 0% 30%, 0% 40%, 100% 40%, 100% 50%, 0% 50%, 0% 60%, 100% 60%, 100% 70%, 0% 70%, 0% 80%, 100% 80%, 100% 90%, 0% 90%, 0% 100%)',
        opacity: '.3'
      })} />

      <Box sx={{
        zIndex: 2,
        background: '#19191992',
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
