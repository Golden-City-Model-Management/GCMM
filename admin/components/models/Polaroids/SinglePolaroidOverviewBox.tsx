import { ModelWithPolaroidsAndPortfolio, Polaroids, Image as ImageInterface } from "@/types/models"
import Typography from "@mui/material/Typography"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PolaroidsListWithTitle from '@/components/models/Polaroids/PolaroidsListWithTitle'
import Image from 'next/image'
import { useState, useCallback, useContext } from "react"
import EditOutlined from "@mui/icons-material/EditOutlined"
import Carousel from '@/components/Carousel'
import Lightbox from "../../Lightbox"
import PolaroidsForm from "./PolaroidsForm"
import Request from '@/utils/api/request'
import { uploadFile, deleteWithToken } from "@/utils/cloudinary"
import { modelsReducer, notificationReducer, StoreContext } from '@/reducers/store'
import Close from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const transformPolaroidObjKeys = (obj: { [key: string]: any }, excludedFields: string[]) => {
  return Object.keys(obj).filter(key => !excludedFields.includes(key)).map(key => ({
    title: key.split('_').join(' '),
    img: obj[key as keyof typeof obj]
  }))
}


const PolaroidsOverviewBox = ({ polaroids, title, id, setLoading, }: {
  polaroids?: Polaroids, title: string, model: ModelWithPolaroidsAndPortfolio, id?: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}) => {

  const { state: { models: { model } }, combinedDispatch: { notificationDispatch, modelsDispatch } } = useContext(StoreContext)
  const [isEditing, setIsEditing] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)
  const images = transformPolaroidObjKeys(polaroids ? polaroids : {}, ['_id'])

  const updatePolaroids = useCallback(async (polaroids: { [x: string]: ImageInterface }) => {
    let response
    if (title.toLowerCase() === 'main polaroids') {
      response = await Request({ path: `/models/${model.id}`, method: 'patch', data: { polaroids, } })
    } else {
      response = await Request({
        path: `/models/${model.id}`, method: 'patch', data:
          { extra_polaroids: [{ ...polaroids, _id: id },], }
      })
    }
    if (response.statusCode === 200) {
      notificationDispatch({
        type: notificationReducer.notificationActions.showNotification, payload: {
          show: true, message: `${response.message}`, type: 'success'
        }
      })
      modelsDispatch({ type: modelsReducer.modelsActions.updateSingleModel, payload: response.doc })
    } else {
      Object.keys(polaroids).forEach(key => {
        deleteWithToken(polaroids[key as keyof typeof polaroids].delete_token as string,
          polaroids[key as keyof typeof polaroids].public_id as string)
      })
    }
  }, [id, model.id, modelsDispatch, notificationDispatch, title])

  const postImages = useCallback(async (images: { [x: string]: File }) => {
    setLoading(true)
    const uploadedImages = await Promise.all(Object.keys(images)
      .filter(key => images[key].name.length > 0)
      .map(async (key: string) => {
        return {
          name: key,
          img: await uploadFile({
            file: images[key], folder: `polaroids/${model.name}`, upload_preset: process.env.NEXT_PUBLIC_POLIP || ''
          })
        }
      }))
    const successes = uploadedImages.filter(img => !img.img.error)
    if (successes.length > 0) {
      let updPolaroids: {
        [x: string]: ImageInterface
      } = {}
      successes.forEach(img => {
        updPolaroids[img.name as keyof typeof updPolaroids] = img.img
      })
      updatePolaroids(updPolaroids)
    }
    setLoading(false)
  }, [model.name, setLoading, updatePolaroids])

  const handleUpdatePolaroids = useCallback((data: {
    [x: string]: {
      file: File, src: string
    }
  }) => {
    setLoading(true)
    setIsEditing(prev => !prev)
    const editedPolaroidEntries = Object.entries(data).filter(entry => entry[1].file.name !== undefined)
    let finalData: {
      [x: string]: any
    } = {}
    editedPolaroidEntries.forEach(entry => {
      finalData[entry[0] as keyof typeof finalData] = entry[1].file
    })
    postImages(finalData)
    setLoading(false)
  }, [postImages, setLoading])

  if (!isEditing) {
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
          <Box position='relative' width='90%' top='10%' left='5%'>
            <Carousel carouselItems={
              images.map(img => {
                return (
                  <Card key={img.title} sx={{ backgroundColor: 'transparent', }}>
                    <CardMedia sx={{
                      position: 'relative',
                      minHeight: '70vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Image
                        width={img.img.width}
                        height={img.img.height}
                        src={img.img.secure_url}
                        alt={img.title}
                        layout='fixed'
                        style={{ display: 'block', margin: '0 auto' }}
                      />
                    </CardMedia>
                    <CardContent>
                      <Typography variant="h5" textAlign="center" textTransform="capitalize">
                        {img.title}
                      </Typography>
                    </CardContent>
                  </Card>
                )
              })
            } />
          </Box>
        </Lightbox>
      </>
    )
  }

  return (
    <>
      <Box position='relative'>
        <Box position='absolute' top='2%' right='2%' >
          <IconButton onClick={() => { setIsEditing(prev => !prev) }} color='inherit'>
            <Close />
          </IconButton>
        </Box>
        <PolaroidsForm handleSubmit={(data) => handleUpdatePolaroids(data)} existingPolaroids={polaroids} />
      </Box>
    </>

  )
}

export default PolaroidsOverviewBox 