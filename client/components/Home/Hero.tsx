

import Bg1 from '@/public/assets/images/BG-01.jpg'
import Bg2 from '@/public/assets/images/BG-02.jpg'
import Bg3 from '@/public/assets/images/BG-03.jpg'
import Bg5 from '@/public/assets/images/BG-05.jpg'
import Bg6 from '@/public/assets/images/BG-06.jpg'
import Bg7 from '@/public/assets/images/BG-07.jpg'
import Bg8 from '@/public/assets/images/BG-08.jpg'

import { useContext, useState, useEffect } from 'react' 
import { UIContext } from '@/context/ui'
import NextLink from 'next/link'
import { StyledBorderBtn } from '@/components/common/Buttons'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const heroLinks = [
  {
    name: 'Main Board',
    to: '/main-board'
  },
  {
    name: 'New Faces',
    to: '/new-faces'
  }
]


const Hero = () => {

  const [currentBg, setCurrentBg] = useState(0)
  const [fade, setFade] = useState(false)
  const { fullHeightWithoutHeader } = useContext(UIContext)
  const backgrounds = [ Bg1, Bg2, Bg3, Bg5, Bg6, Bg7, Bg8, ]

  useEffect(() => {
    const incrementInterval = setInterval(() => {
      if(fade === true){
        if(currentBg === backgrounds.length - 1){
          setCurrentBg(0)
        }else if(currentBg < backgrounds.length - 1){
          setCurrentBg(prev => prev + 1)
        }
        setFade(false)
      }
    }, 4500)
    return () => {
      clearInterval(incrementInterval)
    }
  }, [backgrounds])

  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setFade(true)
    }, 4000)

    return () => {
      clearInterval(fadeInterval)
    }
  }, [])

  const checkedElBg = currentBg % 2 ? `linear-gradient(0deg, rgba(25,25,25,1) 0%, rgba(0,0,0,0.2956) 100%), url(${backgrounds[currentBg].src}), url(${backgrounds[currentBg].blurDataURL})` : `linear-gradient(135deg, hsl(0deg 0% 16% / 24%) 49%, hsl(51deg 100% 50% / 32%) 100%), url(${backgrounds[currentBg].src}), url(${backgrounds[currentBg].blurDataURL})`

  const mainBg = currentBg % 2 ? `linear-gradient(135deg, hsl(0deg 0% 16% / 24%) 49%, hsl(51deg 100% 50% / 32%) 100%), url(${backgrounds[currentBg].src}), url(${backgrounds[currentBg].blurDataURL})` : `linear-gradient(0deg, rgba(25,25,25,1) 0%, rgba(0,0,0,0.2956) 100%), url(${backgrounds[currentBg].src}), url(${backgrounds[currentBg].blurDataURL})`

  return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: fullHeightWithoutHeader,
        position: 'relative',
        background: mainBg,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        transition: 'all .45 ease-in',
      }}>
        <Box sx={() => ({
          width: '100%',
          height:'100%',
          position: 'absolute',
          background: mainBg,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          opacity: fade ? 1 : 0,
          transition: 'all .5s ease-in'
        })}/>
        
        <Box sx={() => ({
          width: '100%',
          height:'100%',
          position: 'absolute',
          background: checkedElBg,
          clipPath: 'polygon(0% 0%, 10% 0%, 10% 100%, 20% 100%, 20% 0%, 30% 0%, 30% 100%, 40% 100%, 40% 0%, 50% 0%, 50% 100%, 60% 100%, 60% 0%, 70% 0%, 70% 100%, 80% 100%, 80% 0%, 90% 0%, 90% 100%, 100% 100%, 100% 0%, 100% 10%, 0% 10%, 0% 20%, 100% 20%, 100% 30%, 0% 30%, 0% 40%, 100% 40%, 100% 50%, 0% 50%, 0% 60%, 100% 60%, 100% 70%, 0% 70%, 0% 80%, 100% 80%, 100% 90%, 0% 90%, 0% 100%)',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          opacity: fade ? 1 : 0,
          transition: 'all .5s ease-in'
        })}/>

        <Box sx={{
          zIndex: 2,
          background:fade ? '#1919198c' : '#19191992',
          backdropFilter: fade ? 'blur(2px)' : '',
          transition: 'all .5s ease-in',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          padding: {
            lg: '0 119px',
            md: '0 50px',
            xs: '0 30px',
          }}}>
          <Typography
          component='h1'
          variant='caption'
          mb='25px'
          >
            <Typography
             variant='caption'
             color={(theme) => theme.palette.text.secondary}>
              Golden</Typography>City <div />
              Model Management
            </Typography>
            <Box
            sx={{display: 'flex', gap: '25px'}}
            data-testid='ctas'
            >
            {
              heroLinks.map(link => (
                <NextLink key={link.to} href={link.to} passHref>
                  <StyledBorderBtn>
                    {link.name}
                  </StyledBorderBtn>
                </NextLink>
              ))
            }
            </Box>
        </Box>
      </Box>
  )
} 


export default Hero
 