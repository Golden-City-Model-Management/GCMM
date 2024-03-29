import { ModelWithPolaroidsAndPortfolio, } from "@/types/models"
import Typography from "@mui/material/Typography"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Loader from "@/components/common/loader"
import { ErrorAlert, SuccessAlert } from '@/components/common/alert'
import { TopCenteredSnackbar } from "@/components/common/snackbars"
import { useState } from "react"
import PolaroidsOverviewBox from './SinglePolaroidOverviewBox'

const PolaroidsOverview = ({ model, togglePolaroidsOverview }: {
  model: ModelWithPolaroidsAndPortfolio,
  togglePolaroidsOverview: (newState?: boolean) => void
}) => {

  const [notification, setNotification] = useState<{
    show: boolean, message: string, type: 'error' | 'success'
  }>({
    show: false, message: '', type: 'error'
  })
  const [loading, setLoading] = useState(false)
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
        <Button onClick={() => togglePolaroidsOverview(false)} variant='text' color='inherit'>&larr;&nbsp;Back</Button>
      </Box>
      <Typography fontWeight='bold' variant='caption' textAlign='center' mt={3} mb={0} mx='auto' component='h1'>
          Now viewing {model.name}&apos;s Polaroids
      </Typography>
      <PolaroidsOverviewBox setLoading={setLoading}  polaroids={model.polaroids} title='Main Polaroids' model={model}  />
      <PolaroidsOverviewBox setLoading={setLoading} polaroids={model.extra_polaroids[0]} title='Extra Polaroids 1' model={model} id={model.extra_polaroids[0]?._id}  />
      <PolaroidsOverviewBox setLoading={setLoading} polaroids={model.extra_polaroids[1]} title='Extra Polaroids 2' model={model} id={model.extra_polaroids[1]?._id}  />
    </Box>
  )
}

export default PolaroidsOverview