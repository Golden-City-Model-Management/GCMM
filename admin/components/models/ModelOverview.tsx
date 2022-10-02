
import AdminLayout from "@/components/layout/Layout"
import { ModelWithPolaroidsAndPortfolio } from "@/types/models"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ModelDataDetails from '@/components/models/ModelData'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const ModelOverview = ({ model, toggleEditDetails, togglePolaroidsOverview }: {
  model: ModelWithPolaroidsAndPortfolio,
  toggleEditDetails: (newState?: boolean) => void,
  togglePolaroidsOverview: (newState?: boolean) => void
}) => {

  const router = useRouter()

  return (
    <AdminLayout title={`${model.name} | GCMM`} description={`An overview of ${model.name}`}>
      <Box mt={6}>
        <Grid width='100vw' py={5} minHeight='75vh' container columns={2} gap={3}>
          <Grid item xs={2} justifyContent='center' alignItems='center'>
            <Typography textAlign='center'
              fontFamily='Aboreto' maxWidth='70ch' margin='0 auto' component='h1'
              fontSize={'3.8rem'} fontWeight={'100'} textTransform='capitalize'
            >{model.name}</Typography>
            <ModelDataDetails model={model} />
            <Box display='flex' gap={3} justifyContent='center' alignItems='center' flexWrap='wrap'>
              <Button onClick={() => toggleEditDetails(true)} size='small' color='inherit' variant='outlined'>
                Edit Details
              </Button>
              <Button
                onClick={() => togglePolaroidsOverview(true)}
                sx={{ display: 'inline-block' }} component='a' size='small' color='inherit' variant='outlined' >
                Manage Polaroids
              </Button>
              <NextLink passHref style={{ display: 'inline-block', textAlign: 'center' }}
                href={`${router.asPath}/portfolio`}>
                <Button component='a' size='small' color='inherit' variant='outlined' >
                  Manage Portfolio
                </Button>
              </NextLink>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  )
}

export default ModelOverview