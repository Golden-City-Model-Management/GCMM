
import ModelForm from '@/components/models/ModelForm'
import { Model } from '@/types/models'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useCallback, useState, useMemo } from 'react'
import PolaroidsForm from '@/components/models/PolaroidsForm'


const Models = () => {

  const [modelData, setModelData] = useState<Model>()
  const isImgUploadStage = useMemo(() => modelData !== undefined, [modelData])

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

  const handleFormSubmit = useCallback((data: Model) => {
    setModelData(composeData(data))
  }, [composeData])

  const createModel = useCallback((data: Model) => {

  }, [])

  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <Box bgcolor='primary.light' borderRadius='12px' maxWidth='1100px'
        boxShadow={2} px={{ xs: 2, md: 5 }}
        py={{ xs: 6, md: 9 }} width='90vw'>
        <Typography component='h1' variant='caption' textAlign='center' my={3} >
          {!isImgUploadStage ? <>Select Cover Image and Polaroids</> : <>Enter the basic information about the model</>}
        </Typography>
        {
          !isImgUploadStage ?
            <>
              <Box>
                <Button color="secondary" component="label" sx={{margin: '0 auto', display: 'block', width: 'max-content'}}>
                  <input type="file" accept="image/*" hidden />
                   Cover Image
                </Button>
              </Box>
              <PolaroidsForm handleSubmit={data => console.log(data)} />
            </>
            :
            <>
              <ModelForm
                model={{
                  name: '', dob: '', height: 0, bust: 0, shoe: 0, hips: 0, waist: 0, cover_image: '/vercel',
                  gender: 'female', id: '', isActive: true, socials: {}
                }}
                submitBtnTxt='Submit Changes' handleSubmit={handleFormSubmit} />
            </>
        }
      </Box>
    </Box>
  )
}

export default Models