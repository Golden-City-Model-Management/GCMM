import { Model, ModelWithPolaroidsAndPortfolio, Polaroids, Image as ImageInterface } from "@/types/models"
import Typography from "@mui/material/Typography"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PolaroidsListWithTitle from '@/components/models/PolaroidsListWithTitle'
import Image from 'next/image'
import { useState, useCallback, useContext } from "react"
import EditOutlined from "@mui/icons-material/EditOutlined"
import Carousel from '@/components/Carousel'
import Lightbox from "../Lightbox"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { emphasize } from "@mui/material"
import PolaroidsForm from "./PolaroidsForm"
import Request from '@/utils/api/request'
import { uploadFile, deleteWithToken } from "@/utils/cloudinary"
import { modelsReducer, notificationReducer, StoreContext} from '@/reducers/store'

const PolaroidItem = ({ img }: {
  img: { title: string, img: ImageInterface }
}) => {
  return (
    <Card key={img.title} sx={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
      <CardMedia>
        {img.img.secure_url.length === 0 ?
          <Box position='absolute' display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
            <Box>No Image</Box>
          </Box>
          :
          <Image objectFit="contain" alt={img.title} layout='fill' src={img.img.secure_url} />}
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


const PolaroidsOverviewBox = ({ polaroids, title, id }: {
  polaroids?: Polaroids, title: string, model: ModelWithPolaroidsAndPortfolio, id?: string
}) => {

  const { state: { models: { model } }, combinedDispatch: { notificationDispatch, modelsDispatch } } = useContext(StoreContext)
  const [isEditing, setIsEditing] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)
  const images = transformPolaroidObjKeys(polaroids ? polaroids : {}, ['_id'])

  const updatePolaroids = useCallback(async (polaroids: { [x:string]: ImageInterface}) => {
    let response
    if(title.toLowerCase() === 'main polaroids'){
      response = await Request({ path: `/models/${model.id}`, method: 'patch', data: { polaroids,} })
    }else{
      response = await Request({ path: `/models/${model.id}`, method: 'patch', data: 
      { extra_polaroids: [ {...polaroids, _id: id}, ],} })
    }
    if(response.statusCode === 200){
      notificationDispatch({type: notificationReducer.notificationActions.showNotification, payload: {
        show: true, message: `${response.message}`, type: 'success' 
      }})
      modelsDispatch({type: modelsReducer.modelsActions.updateSingleModel, payload: response.doc})
    }else{
     Object.keys(polaroids).forEach(key => {
      deleteWithToken(polaroids[key as keyof typeof polaroids].delete_token as string,
        polaroids[key as keyof typeof polaroids].public_id as string)
     })
    }
  }, [id, model, modelsDispatch, notificationDispatch, title])

  const postImages = useCallback( async (images: {[x: string]: Blob}) => {
    const uploadedImages = await Promise.all(Object.keys(images).map(async (key: string) => ({
      name: key, 
      img: await uploadFile({
        file: images[key], folder: `polaroids/${model.name}`, upload_preset: process.env.NEXT_PUBLIC_POLIP || ''
      })
    })))
    const successes = uploadedImages.filter(img => !img.img.error)
    if(successes.length > 0){
      let updPolaroids: {
        [x: string]: ImageInterface
      } = {}
      successes.forEach(img => {
        updPolaroids[img.name as keyof typeof updPolaroids] = img.img
      })
      updatePolaroids(updPolaroids)      
    }
  }, [model, updatePolaroids])

  const handleUpdatePolaroids = useCallback((data: { [x: string]: {
    file: File, src: string
  }}) => {
    setIsEditing(prev => !prev)
    const editedPolaroidEntries = Object.entries(data).filter(entry => entry[1].file.name !== undefined)
    let finalData: {
      [x: string]: any
    } = {}
    editedPolaroidEntries.forEach(entry => {
      finalData[entry[0] as keyof typeof finalData] = entry[1].file
    })
    postImages(finalData)
  }, [postImages])

  return (
    <>

      {
        !isEditing &&
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
              <Carousel carouselItems={images.map((img) => (<PolaroidItem key={img.title} img={img} />))} />
            </Box>
          </Lightbox>
        </>
      }
      {
        isEditing &&
        <Box position='relative'>
          <Box position='absolute' top='2%' right='2%' >
            <Button onClick={() => { setIsEditing(prev => !prev) }} variant='text' color='inherit'>
              Cancel
            </Button>
          </Box>
          <PolaroidsForm handleSubmit={(data) => handleUpdatePolaroids(data)} />
        </Box>

      }
    </>

  )
}

export default PolaroidsOverviewBox 