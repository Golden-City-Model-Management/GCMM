import { Model } from "@/context/models"
import Typography from "@mui/material/Typography"
import Box from '@mui/material/box'
import Button from '@mui/material/Button'
import Loader from "@/components/common/loader"
import { ErrorAlert, SuccessAlert } from '@/components/common/alert'
import { TopCenteredSnackbar } from "@/components/common/snackbars"
import Image from 'next/image'
import { useRouter } from "next/router"
import ModelForm from "./ModelForm"
import Request from '@/utils/client/request'
import { useCallback, useState } from "react"


const EditModelDetails = ({ model }: { model: Model }) => {

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
    if (response.status === 200) {
      setModelData(response.data.doc)
      setNotification({ show: true, message: response.data.message, type: 'success' })
    } else {
      setNotification({ show: true, message: response.data.message, type: 'error' })
    }
    setLoading(false)
  }, [model])

  const router = useRouter()

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
        <Button onClick={() => router.back()} variant='text' color='inherit'>&larr;&nbsp;Back</Button>
      </Box>
      <Box borderRadius='12px' bgcolor='primary.light' px={8} py={8} >
        <Box width='150px' height='150px' borderRadius='50%' overflow='hidden' mx='auto' position='relative' >
          <Image layout='fill' alt={model.name} src={model.cover_image} />
        </Box>
        <Typography variant='caption' textAlign='center' my={3} mx='auto' component='h1'>
          Now editing {model.name}
        </Typography>
        <ModelForm model={{ ...modelData, dob: new Date(modelData.dob) }} submitBtnTxt='Update Details' handleSubmit={updateDetails} />
      </Box>
    </Box>
  )
}
export default EditModelDetails
