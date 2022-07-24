
import { useState, useCallback, useEffect } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { StaticImageData } from 'next/image'
import { Theme } from '@mui/material';


const Carousel = ({ images, width, height }: {
  images: { img: StaticImageData, title: string }[]
  width?: string,
  height?: string
}) => {

  const [translate, setTranslate] = useState(0)
  const [currentActive, setCurrentActive] = useState(0)

  const handleNextClick = useCallback(() => {
    if(currentActive < images.length - 1){
      setCurrentActive(prev => prev + 1)
      setTranslate(prev => prev - 100);
    }else{
      setCurrentActive(0)
      setTranslate(0);
    }
  }, [currentActive])

  const handlePrevClick = useCallback(() => {
    if(currentActive > 0){
     setTranslate(prev => prev + 100)
     setCurrentActive(prev => prev - 1)
    }
  }, [currentActive])
  

  const iconBtnSx = (theme: Theme) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '8px 12px',
    border: `1px solid currentColor`,
    color: theme.palette.secondary.main,
    zIndex: 1,
    backgroundColor: '#00000080'
  })

  useEffect(() => {
    const changeInterval = setInterval(() => {
      handleNextClick()
    }, 4000)
    return () => {
      clearInterval(changeInterval)
    }
  }, [handleNextClick])

  return(
   <Box sx={{position: 'relative', width: '100%',}}> 
   <Box sx={{
      width,
      height,
      maxWidth: '80%',
      maxHeight: '60vh',
      overflow: 'hidden',
      margin: '0 auto',
      position: 'relative'
    }}>
    <IconButton 
       size='large'
       sx={(theme) => ({
        ...iconBtnSx(theme),
        left: '0',
      })}
      onClick={handlePrevClick} aria-label="previous">
        <ArrowBackIosIcon  />
    </IconButton> 

    <IconButton 
    size='large'
    sx={(theme) => ({
      ...iconBtnSx(theme),
      right: '0',
    })}
     onClick={handleNextClick} aria-label="next">
        <ArrowForwardIosIcon  />
    </IconButton>  
    <List 
    sx={() => ({
      display: 'flex',
      flexDirection: 'row',
      transform: `translate3d(${translate}%, 0px, 0px)`,
      transition: 'all .5s ease',
      padding: '0 0 0 0'
      })}>
     {
        images.map((item) => (
          <ListItem key={item.title}
          sx={{
            padding: '0 0 0 0',
          }}>
           <Box
           component='img' 
           width={width}
           height={height}
           title={item.title}  
           src={item.img.src}
           sx={() => ({
            maxWidth: '80vw',
            maxHeight: '60vh',
            width,
            height,
            objectFit: 'contain',
            position: 'relative',
            borderRadius: '50px',
            overflow: 'hidden'
           })}  />
         </ListItem>
        ))
      }
    </List> 
    </Box>
    </Box>
  )
}
 
export default Carousel


