import { Model, Polaroids } from "@/types/models"
import Typography from "@mui/material/Typography"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PolaroidsListWithTitle from '@/components/models/PolaroidsListWithTitle'
import Image from 'next/image'
import { useState } from "react"
import EditOutlined from "@mui/icons-material/EditOutlined"
import Carousel from '@/components/Carousel'
import Lightbox from "../Lightbox"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { emphasize } from "@mui/material"

const PolaroidItem = ({ img }: {
  img: { title: string, img: string }
}) => {
  return (
    <Card key={img.title} sx={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
      <CardMedia>
        {img.img.length === 0 ?
          <Box position='absolute' display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
            <Box>No Image</Box>
          </Box>
          :
          <Image objectFit="contain" alt={img.title} layout='fill' src={img.img} />}
      </CardMedia>
      <CardContent sx={theme =>
        ({ position: 'absolute', width: '100%', height: '10%', background: emphasize(theme.palette.primary.light, .1), bottom: 0 })}>
        <Typography textAlign='center' textTransform='capitalize' variant="subtitle1" component="p">
          {img.title}
        </Typography>
      </CardContent>
    </Card>)
}

const transformPolaroidObjKeys = (obj: { [key: string]: any }, excludedFields: string[]) => {
  return Object.keys(obj).filter(key => !excludedFields.includes(key)).map(key => ({
    title: key.split('_').join(' '),
    img: obj[key as keyof typeof obj]
  }))
}


const PolaroidsOverviewBox = ({ polaroids, title }: {
  polaroids?: Polaroids, title: string,
}) => {

  const [isEditing, setIsEditing] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)
  const images = transformPolaroidObjKeys(polaroids ? polaroids : {}, ['_id'])

  return (
    <>
      <Box position='relative' width='90vw' maxWidth='1024px' borderRadius='12px' bgcolor='primary.light'
        px={8} pt={0} pb={5} >
        <Box position='absolute' top='2%' right='2%' >
          <Button onClick={() => { setIsEditing(prev => !prev) }} variant='text' color='inherit'>
          <EditOutlined />&nbsp;Edit</Button>
        </Box>
        <Typography variant='h2' textAlign='center' my={3} mx='auto' component='h2'>
          {title}
        </Typography>
        <Box>
          {images.length > 0 ?
            <>
              <PolaroidsListWithTitle images={images} />
              <Box mx='auto' mt={5} display='flex' justifyContent='center'>
                <Button onClick={() => { setShowLightbox(true) }} size='small' 
                variant='text' color='secondary'>view in lightbox</Button>
              </Box>
            </>
            :
           <Typography variant='body1' component='p' textAlign='center'>{title} has no images.</Typography>}
        </Box>
      </Box>
      <Lightbox showCloseBtn isOpen={showLightbox} close={() => setShowLightbox(false)} title={title}>
        <Box position='absolute' width='80%' height='80%' top='10%' left='10%'>
          <Carousel carouselItems={images.map((img) => (<PolaroidItem key={img.title} img={img} />))}/>
        </Box>
      </Lightbox>
    </>

  )
}

export default PolaroidsOverviewBox 