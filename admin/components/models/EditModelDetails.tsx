import { Model } from "@/context/models"
import Typography from "@mui/material/Typography"
import Box from '@mui/material/box'
import Button from '@mui/material/Button'
import Image from 'next/image'
import { useRouter } from "next/router"
import ModelForm from "./ModelForm"
import Request from '@/utils/client/request'
import { useCallback } from "react"


const EditModelDetails = ({ model }: {model: Model}) => {

  const updateDetails =  useCallback(async (details: Model) => {
    console.log(details)
    const response = await Request({path: `/models/${model.id}`, method: 'post', data: details})
    console.log(response)
  }, [model.id])

  const router = useRouter()
  return (
    <Box display='flex' minHeight='100vh' justifyContent='center' alignItems='center' >
    <Box position='fixed' top='5%' left='2%' >
      <Button onClick={() => router.back()}  variant='text' color='inherit'>&larr;&nbsp;Back</Button>
    </Box>
    <Box borderRadius='12px' bgcolor='primary.light' px={8} py={8} >
      <Box width='150px' height='150px' borderRadius='50%' overflow='hidden' mx='auto' position='relative' >
       <Image layout='fill' alt={model.name} src={model.cover_image} />
      </Box>
      <Typography variant='caption' textAlign='center' my={3} mx='auto' component='h1'>
        Now editing {model.name}
      </Typography>
    <ModelForm model={{...model, dob: new Date('2022-03-03')}} submitBtnTxt='Update Details' handleSubmit={updateDetails} />
    </Box>
  </Box>
  )
}
export default EditModelDetails
