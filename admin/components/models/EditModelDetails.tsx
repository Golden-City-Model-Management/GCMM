import { Model } from "@/types/models"
import Typography from "@mui/material/Typography"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Loader from "@/components/common/loader"
import { ErrorAlert, SuccessAlert } from '@/components/common/alert'
import { TopCenteredSnackbar } from "@/components/common/snackbars"
import Image from 'next/image'
import ModelForm from "./ModelForm"
import Request from '@/utils/api/request'
import { useCallback, useState, useContext } from "react"
import { modelsReducer, StoreContext } from "reducers/store"

const EditModelDetails = ({ toggleEditDetails }:
   {
     toggleEditDetails: (newState?: boolean) => void
   }) => {

  const { state : {models: { model }}, combinedDispatch } = useContext(StoreContext)
  
  const [modelData, setModelData] = useState(model)
  const [notification, setNotification] = useState<{
    show: boolean, message: string, type: 'error' | 'success'
  }>({
    show: false, message: '', type: 'error'
  })
  const [loading, setLoading] = useState(false)

  const updateDetails = useCallback(async (details: Model) => {
    setLoading(true)
    const data = { ...details, dob: new Date(details.dob) }
    const response = await Request({ path: `/models/${model.id}`, method: 'patch', data })
    console.log(response)
    if (response.statusCode === 200) {
      setModelData(response.doc)
      combinedDispatch.modelsDispatch({type: modelsReducer.modelsActions.updateSingleModel, payload: response.doc})
      window.location.pathname = `admin/models/${response.doc.name}`
      setNotification({ show: true, message: response.message, type: 'success' })
    } else {
      setNotification({ show: true, message: response.message, type: 'error' })
    }
    setLoading(false)
  }, [combinedDispatch, model.id])

  return (
    <Box display='flex' minHeight='100vh' justifyContent='center' alignItems='center' >
      <Box>
        <TopCenteredSnackbar autoHideDuration={6000} open={notification.show} 
        onClose={() => setNotification({ show: false, message: '', type: 'error' })}>
          <>
            {notification.type === 'error' && <ErrorAlert>{notification.message}</ErrorAlert>}
            {notification.type === 'success' && <SuccessAlert>{notification.message}</SuccessAlert>}
          </>
        </TopCenteredSnackbar>
      </Box>
      <Loader open={loading} />
      <Box position='fixed' top='5%' left='2%' >
        <Button onClick={() => toggleEditDetails(false)} variant='text' color='inherit'>&larr;&nbsp;Back</Button>
      </Box>
      <Box borderRadius='12px' bgcolor='primary.light' px={8} py={8} >
        <Box width='150px' height='150px' borderRadius='50%' overflow='hidden' mx='auto' position='relative' >
          <Image layout='fill' alt={model.name} src={model.cover_image} />
        </Box>
        <Typography variant='caption' textAlign='center' my={3} mx='auto' component='h1'>
          Now editing {modelData.name} 
        </Typography>
        <ModelForm model={{ ...modelData, dob: modelData.dob.slice(0, 10) }} 
        submitBtnTxt='Update Details' handleSubmit={updateDetails} />
      </Box>
    </Box>
  )
}
export default EditModelDetails
