
import { useContext, useState, useEffect } from 'react' 
import { UIContext } from '@/context/ui'
import NextLink from 'next/link'
import { StyledBorderBtn } from '@/components/common/Buttons'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { backgrounds } from '@/constants/images'
import { heroLinks } from '@/constants/links'


const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0)
  const [fade, setFade] = useState(false)
  const { fullHeightWithoutHeader, universalContainerPadding } = useContext(UIContext)

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

  const bgElementSx = () => ({
    width: '100%',
    height:'100%',
    position: 'absolute',
    backgroundPosition: 'center',
    backgroundSize: {
      xs: 'cover',
      md: 'contain',
    },
    opacity: fade ? 1 : 0,
    transition: 'all .5s ease-in'
  })


  return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: fullHeightWithoutHeader,
        position: 'relative',
        background: mainBg,
        backgroundPosition: 'center',
        backgroundSize: {
          xs: 'cover',
          md: 'contain',
        },
        transition: 'all .45 ease-in',
      }}>
        <Box sx={() => ({
          ...bgElementSx(),
          background: mainBg,
        })}/>
        <Box sx={() => ({
          ...bgElementSx(),
          background: checkedElBg,
          clipPath: 'polygon(0% 0%, 10% 0%, 10% 100%, 20% 100%, 20% 0%, 30% 0%, 30% 100%, 40% 100%, 40% 0%, 50% 0%, 50% 100%, 60% 100%, 60% 0%, 70% 0%, 70% 100%, 80% 100%, 80% 0%, 90% 0%, 90% 100%, 100% 100%, 100% 0%, 100% 10%, 0% 10%, 0% 20%, 100% 20%, 100% 30%, 0% 30%, 0% 40%, 100% 40%, 100% 50%, 0% 50%, 0% 60%, 100% 60%, 100% 70%, 0% 70%, 0% 80%, 100% 80%, 100% 90%, 0% 90%, 0% 100%)',
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
          padding: universalContainerPadding
          }}>
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
 