


import Request from "@/utils/api/request"
import AdminLayout from "@/components/layout/Layout"
import { useRouter } from "next/router"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PortfolioImageList from '@/components/models/PortfolioImageList'
import { useState, useEffect, useContext, useCallback } from "react"
import Button from '@mui/material/Button'
import { StoreContext, modelsReducer } from "reducers/store"
import useSWR from 'swr'
import { Image } from "@/types/models"
import { uploadFile } from '@/utils/cloudinary/index'

interface ModelResponse {
  message: string,
  status: string,
  statusCode: 200,
  gallery: Image[]
}

const GalleryPage = () => {
  const router = useRouter()
  const { data } = useSWR<ModelResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}/gallery`,
    () => Request({ path: `/gallery`, method: 'get', }))

  // const { state: { models: { model: modelInState }, }, combinedDispatch: { modelsDispatch } } = useContext(StoreContext)
  console.log(data)
  const [isScrolling, setIsScrolling] = useState(false)

  const uploadImages = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const uploads = []
    if(files && files.length > 0){
      for(let file of files){
        uploads.push( uploadFile({file, folder: `gallery`, upload_preset: process.env.NEXT_PUBLIC_GALLIP || ''}))
      }
    }
    const uploadedImages = [...(await Promise.all([...uploads]))].filter(el => el.error === undefined)
    const storedPortfolios = await Request({path: '/gallery', method: 'post', data: { images: uploadedImages }})
    // modelsDispatch({type: modelsReducer.modelsActions.updateSingleModel, payload: {
    //   ...modelData, portfolio: [...modelData.portfolio, ...storedPortfolios.images]
    // } })
  }, [])
  
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY > 20) setIsScrolling(true)
      else setIsScrolling(false)
    })
    return () => window.removeEventListener('scroll', () => setIsScrolling(false))
  }, [])

  // if (!modelData || Object.keys(modelData).length === 0) {
  //   return (
  //     <AdminLayout title='Error' description='An error has occurred!'>
  //       <Box display='flex' justifyContent='center' alignItems='center' minHeight='65vh'>
  //         <Box maxWidth='800px' textAlign='center' mx='auto'>
  //           <Typography lineHeight={1.3} my={3} variant='caption' component='h1'>
  //             An Error Occurred <br />
  //           </Typography>
  //           <Typography variant='h4' component='p'>
  //             Please check your internet connection and try refreshing the page.<br />
  //           </Typography>
  //         </Box>
  //       </Box>
  //     </AdminLayout>
  //   )
  // }

  return (
    <AdminLayout title={`Gallery | GCMM`} description={`GCMM Gallery`} >
      <Box position='relative'>
        <Box px={{ xs: 3, md: 0 }} py={3} display='flex' borderColor='currentColor'
          borderBottom='1px solid' justifyContent='space-around'
          bgcolor={t => t.palette.primary.main} position={isScrolling ? 'fixed' : 'static'}
          top='13%' zIndex='1' width='100%'>
          <Typography component='h2' variant='caption'
            textAlign='center'>Gallery</Typography>
          <Button variant='text' color='secondary' component="label">
            <input type="file" name={'add new portfolio image'} multiple value={''} 
            onChange={uploadImages} accept="image/*" hidden />
            Add Image
          </Button>
        </Box>
        <Box width='95vw' maxWidth='1150px' mx='auto'>
          {[].length <= 0 ?
            <Typography component='p' variant='h4' textAlign='center' mt={30}>No Images</Typography>
            : <PortfolioImageList images={[]} />}
        </Box>
      </Box>
    </AdminLayout>
  )
}

export default GalleryPage 