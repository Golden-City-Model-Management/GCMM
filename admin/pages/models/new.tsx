
import ModelForm from '@/components/models/ModelForm'
import { Model } from '@/types/models'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useCallback, useState, useRef, useContext } from 'react'
import { uploadFile, deleteWithToken } from '@/utils/cloudinary'
import Image from 'next/image'
import EditOutlined from '@mui/icons-material/EditOutlined'
import Request from '@/utils/api/request'
import { notificationReducer, StoreContext} from '@/reducers/store'
import Loader from '@/components/common/loader'
import AdminLayout from '@/components/layout/Layout'

const modelInitialState = {
  first_name: '', last_name: '', dob: '', height: 0, bust: 0, shoe: 0, hips: 0, waist: 0, cover_image: {} as any,
  gender: 'female', id: '', isActive: true, socials: {}, is_new_face: 'no', name: ''
}

const Models = () => {

  const [coverImage, setCoverImage] = useState<{file: File, blob: string}>()
  const coverImgInputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const { combinedDispatch: { notificationDispatch } } = useContext(StoreContext)

  const composeData = useCallback((data: Model) => {
    let finalData = { ...data }
    Object.keys(finalData).forEach(key => {
      if (key === 'dob') {
        finalData[key] = new Date(finalData[key]).toISOString()
      }
      if (key === 'gender') {
        finalData.chest = finalData[key] === 'male' ? finalData.bust : undefined
        finalData.bust = finalData[key] === 'female' ? finalData.bust : undefined
      }
    })
    return finalData
  }, [])

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const file = files ? files[0] : null
    if (file) {
      setCoverImage({file, blob: URL.createObjectURL(file)})
    }
    if(coverImage !== undefined){
      return URL.revokeObjectURL(coverImage.blob)
    }
  }, [coverImage])

  const postData = useCallback(async(data: Model & {
    cover_image: any
  }) => {
    try{
      const response = await Request({path: '/models', method: 'post', data, })
      return response
    } catch(err){
      console.error(err)
      return err
    }
  }, [])

  const handleResponse = useCallback( async (response, { token, public_id }) => {
    const isSuccess = response.statusCode === 201 
    notificationDispatch({type: notificationReducer.notificationActions.showNotification, payload: {
      show: true, message: `${!isSuccess ?'Unable to create model.' : ''} ${response.message}`, type: isSuccess ? 'success' : 'error'
    }})
    setCoverImage(undefined)
    setLoading(false)
    if(!isSuccess){
      deleteWithToken(token, public_id)
    }
  }, [notificationDispatch])

  const createModel = useCallback(async (data: Model) => {
    let modelData = composeData(data)
    if(!coverImage?.file) return
    setLoading(true) 
    const uploadedImage = await uploadFile({ file: coverImage.file, folder: `cover_images/${modelData.first_name}-${modelData.last_name}`, 
    upload_preset: process.env.NEXT_PUBLIC_CIP || ''})
    if(await uploadedImage?.statusCode === 200){
      modelData = { ...modelData, cover_image: uploadedImage }
      handleResponse(await postData(modelData), {token: uploadedImage.delete_token, public_id: uploadedImage.public_id})
    }
  }, [composeData, coverImage, handleResponse, postData])

  return (
    <AdminLayout title={'Create A New Model'} description={'Create A new Model'}>
     <Box display='flex' justifyContent='center' alignItems='center' minHeight='80vh'>
      <Box bgcolor='primary.light' borderRadius='12px' maxWidth='1100px'
        boxShadow={2} px={{ xs: 2, md: 5 }}
        py={{ xs: 6, md: 9 }} width='90vw'>
        <Typography component='h1' variant='caption' textAlign='center' my={3} >
          <>Enter the basic information about the model</>
        </Typography>
        <>
          <Button
            variant='outlined' 
            color="inherit" 
            component="label" 
            sx={{margin: '0 auto  4rem', width: 'max-content', display: coverImage?.blob === undefined ? 'block' : 'none'}}>
            <input ref={coverImgInputRef} value={''} onChange={handleImageUpload} name='cover_image' type="file" accept="image/*" hidden />
            Choose Cover Image
          </Button>
          {coverImage?.blob !== undefined && 
            <Box position='relative' width='35vw' height='40vh' margin='6rem auto 3rem' display='flex' flexDirection='column'>
              <Image src={coverImage.blob} alt={`cover image`} layout='fill' />
              <Button variant='outlined' color='inherit' sx={{position: 'absolute', top: '-15%'}} onClick={() => coverImgInputRef.current?.click()}>
                <EditOutlined /> Change Image
              </Button>
            </Box>}
           <ModelForm
            model={modelInitialState}
            submitBtnTxt='Submit Changes' showSubmitBtn={coverImage !== undefined} handleSubmit={createModel} />
        </>
      </Box>
        <Loader open={loading}  />
    </Box>
    </AdminLayout>
  )
}

export default Models