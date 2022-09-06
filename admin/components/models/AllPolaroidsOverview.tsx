import { ModelWithPolaroidsAndPortfolio, Model, Polaroids } from "@/types/models"
import Typography from "@mui/material/Typography"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Loader from "@/components/common/loader"
import { ErrorAlert, SuccessAlert } from '@/components/common/alert'
import { TopCenteredSnackbar } from "@/components/common/snackbars"
import ImageList from '@/components/models/PolaroidsListWithTitle'
import { useRouter } from "next/router"
import Request from '@/utils/client/request'
import { useCallback, useState } from "react"
import EditOutlined from "@mui/icons-material/EditOutlined"
import PolaroidsOverviewBox from './SinglePolaroidOverviewBox'

const getValuesFromObj = (obj: {[key: string]: any}, excludedFields: string[]) => {
  return Object.keys(obj).filter(key => !excludedFields.includes(key)).map(key  => obj[key as keyof typeof obj])
}
const PolaroidsOverview = ({ model }: {
  model: ModelWithPolaroidsAndPortfolio
}) => {

  const [notification, setNotification] = useState<{
    show: boolean, message: string, type: 'error' | 'success'
  }>({
    show: false, message: '', type: 'error'
  })
  const [loading, setLoading] = useState(false)

  const mainPolaroids = getValuesFromObj(model.polaroids, ['_id'])
  const hasExtraPolaroids = model.extra_polaroids.length > 0
  const firstExtraPolaroids = (hasExtraPolaroids && model.extra_polaroids[0]) 
  ? getValuesFromObj(model.extra_polaroids[0], ['_id']) : []
  const secondExtraPolaroids =  (hasExtraPolaroids && model.extra_polaroids[1]) 
  ? getValuesFromObj(model.extra_polaroids[1], ['_id']) : []
  console.log(mainPolaroids, firstExtraPolaroids, secondExtraPolaroids)

  const router = useRouter()
  return (
    <Box display='flex' gap={6} pt={5} pb={15} flexDirection='column' minHeight='100vh' justifyContent='center' alignItems='center' >
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
      <Typography fontWeight='bold' variant='caption' textAlign='center' mt={3} mb={0} mx='auto' component='h1'>
          Now viewing {model.name}&apos;s Polaroids
      </Typography>
      <PolaroidsOverviewBox polaroids={model.polaroids} title='Main Polaroids'  />
      <PolaroidsOverviewBox polaroids={model.extra_polaroids[0]} title='Extra Polaroids 1'  />
      <PolaroidsOverviewBox polaroids={model.extra_polaroids[1]} title='Extra Polaroids 2'  />
    </Box>
  )
}

export default PolaroidsOverview