
import AdminLayout from "@/components/layout/Layout"
import { ModelWithPolaroidsAndPortfolio } from "@/types/models"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ModelDataDetails from '@/components/models/ModelData'
import PolaroidsList from '@/components/models/PolaroidsList'
import NextLink from 'next/link'

const ModelOverview = ({ model }: { model: ModelWithPolaroidsAndPortfolio }) => {

  return (
    <AdminLayout title={`${model.name} | GCMM`} description={`An overview of ${model.name}`}>
      <Box mt={6}>
        <Grid width='100vw' py={5} minHeight={{ xs: '150vh', md: '90vh' }} container columns={2} gap={3}>

          <Grid item xs={2} md={.65} justifyContent='center' alignItems='center'>
            <Typography textAlign='center'
              fontFamily='Aboreto' maxWidth='70ch' margin='0 auto' component='h1'
              fontSize={'3.8rem'} fontWeight={'100'} textTransform='capitalize'
            >{model.name}</Typography>
            <ModelDataDetails model={model} />
            <Box justifyContent='center' my={5} display='flex'>
              <NextLink passHref
                href={`/models/${model.name}?id=${model.id}&editDetails=true`} as={`/models/${model.name}?editDetails=true`}>
                <Button size='small' color='inherit' variant='outlined'>
                  Edit Details
                </Button>
              </NextLink>
            </Box>
          </Grid>

          <Grid item position="relative" justifyContent='center'
            xs={2} md={1.2} mx={'auto'} maxWidth={{ md: '100%', xs: '75%' }}
            sx={{ backgroundColor: '#ffffff1a', borderRadius: '50px' }}>
            <Typography
              fontFamily='Aboreto' textAlign='center' my={3} component='h2'
              fontSize={'2rem'} fontWeight={'100'} textTransform='capitalize'
            >Polaroids and Portfolio</Typography>
            <PolaroidsList polaroids={model.polaroids} />
            <Box textTransform='lowercase' display='flex' justifyContent='space-around'
              alignItems='center' my={6} gap={3}  >
              <NextLink passHref
                href={`/models/${model.name}?id=${model.id}&polaroidsOverview=true`} as={`/models/${model.name}?polaroidsOverview=true`}>
                <Button size='small' color='inherit' variant='outlined' sx={{ fontSize: '1.2rem' }}>
                  Manage Polaroids
                </Button>
              </NextLink>

              <Button size='small' color='inherit' variant='outlined' >
                Manage Portfolio
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </AdminLayout>
  )
}

export default ModelOverview