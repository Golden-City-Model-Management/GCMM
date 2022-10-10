
import { UIContext } from '@/context/context'
import { StyledBorderBtn } from '@/components/common/Buttons'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { WithNextLink } from '@/components/common/Links'
import { heroLinks } from '@/constants/links'
import Bg5 from '@/public/assets/images/BG-05.jpg'
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import { useState, useEffect, useContext } from 'react'

const Hero = () => {
  const [animateCta, setAnimateCta] = useState(false);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      !animateCta && setAnimateCta(true)
    }, 1000)
    return () => {
      clearTimeout(animationTimeout)
    }
  }, [])
  const { fullHeightWithoutHeader, universalContainerPadding } = useContext(UIContext)
  return (
    <Box  sx={{
      background: `url(${Bg5.src}), url(${Bg5.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'right',
    }}>
      <Paper elevation={3} sx={{
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        position: 'relative',
        minHeight: fullHeightWithoutHeader,
        padding: universalContainerPadding,
        background: '#050505a6'
      }}> <Typography
        variant='caption'
        component='span'
        sx={{ animation: 'slide-down 1s linear', animationDelay: '.5s', animationFillMode: 'backwards'}}
        color={(theme) => theme.palette.text.secondary}>
          GoldenCity</Typography>
        <Typography
          component='h1'
          variant='caption'
          sx={{ animation: 'from-left 1s linear', animationDelay: '1s', animationFillMode: 'backwards'}}
        >
          Model Management
        </Typography>
        <Box display='flex' gap={'25px'} minHeight='60px'>
          {
            heroLinks.map((link, idx) => (
              <Grow key={link.to} mountOnEnter in={animateCta} style={{ transformOrigin: '0 0 0' }}
                {...(animateCta ? { timeout: idx * 1000 + 500 } : {})}>
                <Paper sx={{ backgroundColor: 'transparent' }} elevation={0}>
                  <WithNextLink key={link.to} href={link.to} passHref>
                    <StyledBorderBtn>
                      {link.name}
                    </StyledBorderBtn>
                  </WithNextLink>
                </Paper>
              </Grow>
            ))
          }
        </Box>
      </Paper>
    </Box>
  )
}


export default Hero
