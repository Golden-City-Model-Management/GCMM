


import Request from "@/utils/api/request"
import AdminLayout from "@/components/layout/Layout"
import * as styles from '@/components/models/style'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ImageList from '@mui/material/ImageList'
import { useState, useEffect, useContext, useCallback } from "react"
import Button from '@mui/material/Button'
import { StoreContext, galleryReducer } from "reducers/store"
import { Image as ImageInterface } from "@/types/models"
import { uploadFile } from '@/utils/cloudinary/index'
import { GetStaticProps } from "next"
import InfiniteScroll from '@/components/common/InfiniteScroll'
import { galleryActions } from "@/reducers/gallery/reducer"
import { ImageListItem } from "@mui/material"
import Image from "next/image"
import Loader from "@/components/common/loader"

let limit = 20
export const getStaticProps: GetStaticProps = async () => {
  const response = await Request({ path: `/gallery?limit=${limit}&page=1`, method: 'get', })
  let images
  if (response.statusCode === 200) images = response.docs
  else images = []
  return (
    {
      props: {
        images,
        statusCode: response.statusCode || 0,
        status: response.status || '',
        message: response.message || ''
      }
    }
  )
}
const GalleryPage = ({ images }: {
  images: ImageInterface[]
}) => {
  const { state: { gallery: { images: imagesInState }, }, combinedDispatch: { galleryDispatch } } = useContext(StoreContext)
  const [isScrolling, setIsScrolling] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [shouldFetchWithPaginate, setShouldFetchWithPaginate] = useState(true)
  const [loading, setLoading] = useState(false)

  const handlePaginationWithScroll = useCallback(async () => {

    const data = await galleryReducer.fetchImages([{ 'limit': `${limit}`, 'page': (currentPage + 1).toString() }])
    if (!data.error) {
      galleryDispatch({ type: galleryActions.updateGallery, payload: [...data.docs,] })
      setCurrentPage(prev => prev + 1)
      if (data.total_count < limit) {
        setShouldFetchWithPaginate(false)
      }
    }
  }, [currentPage, galleryDispatch])

  const uploadImages = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const files = e.target.files
    const uploads = []
    if (files && files.length > 0) {
      for (let file of files) {
        uploads.push(uploadFile({ file, folder: `gallery`, upload_preset: process.env.NEXT_PUBLIC_GALLIP || '' }))
      }
    }
    const uploadedImages = [...(await Promise.all([...uploads]))].filter(el => el.error === undefined)
    if (uploadedImages.length > 0) {
      const storedData = await Request({ path: '/gallery', method: 'post', data: { images: uploadedImages } })
      galleryDispatch({
        type: galleryReducer.galleryActions.updateGallery, payload: [
          ...storedData.images
        ]
      })
    }
    setLoading(false)
  }, [galleryDispatch])

  useEffect(() => {
    if (imagesInState.length < images.length) {
      galleryDispatch({
        type: galleryReducer.galleryActions.updateGallery, payload: [
          ...images
        ]
      })
    }
    window.addEventListener('scroll', (e) => {
      if (window.scrollY > 20) setIsScrolling(true)
      else setIsScrolling(false)
    })
    return () => window.removeEventListener('scroll', () => setIsScrolling(false))
  }, [galleryDispatch, images, imagesInState])

  return (
    <AdminLayout title={`Gallery | GCMM`} description={`GCMM Gallery`} >
      <Box position='relative'>
        <Box px={{ xs: 3, md: 0 }} py={1} display='flex' borderColor='currentColor'
          borderBottom='1px solid' justifyContent='space-around'
          bgcolor={t => t.palette.primary.main} position={isScrolling ? 'fixed' : 'static'}
          top='13%' zIndex='1' width='100%'>
          <Typography component='h2' variant='caption'
            textAlign='center'>Gallery</Typography>
          <Button variant='text' color='secondary' component="label">
            <input type="file" name={'add new portfolio image'} multiple={true} value={''}
              onChange={uploadImages} accept="image/*" hidden />
            Add Image
          </Button>
        </Box>
        <Box mx='auto'>
          {images.length === 0 ?
            <Typography component='p' variant='h4' textAlign='center' mt={30}>No Images</Typography>
            :
            <InfiniteScroll next={handlePaginationWithScroll} hasMore={shouldFetchWithPaginate}
              dataLength={images.length} loader={null} >
              <ImageList sx={(t) => ({ ...styles.ImageListSx(t), width: '100vw', minHeight: '70vh', })} cols={3} rowHeight={300} >
                {[...imagesInState].reverse().map(img => {
                  return (
                    <ImageListItem sx={({ width: '100%', height: '100%' })} key={img._id}>
                      <Box  sx={({ width: '100%', height: '100%', position: 'relative' })} >
                       <Image priority src={img.secure_url} alt='' layout='fill' />
                      </Box>
                    </ImageListItem>
                  )
                })}
              </ImageList>
            </InfiniteScroll>
          }
        </Box>
      </Box>
      <Loader open={loading} />
    </AdminLayout>
  )
}

export default GalleryPage 