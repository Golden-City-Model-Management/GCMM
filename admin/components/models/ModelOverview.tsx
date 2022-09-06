
import AdminLayout from "@/components/layout/Layout"
import { ModelWithPolaroidsAndPortfolio } from "@/types/models"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ModelDataDetails from '@/components/models/ModelData'
import NextLink from 'next/link'

const ModelOverview = ({ model }: { model: ModelWithPolaroidsAndPortfolio }) => {

  return (
    <AdminLayout title={`${model.name} | GCMM`} description={`An overview of ${model.name}`}>
      <Box mt={6}>
        <Grid width='100vw' py={5}
          sx={t => ({ backgroundColor: t.palette.primary.light })} minHeight='75vh' container columns={2} gap={3}>
          <Grid item xs={2} justifyContent='center' alignItems='center'>
            <Typography textAlign='center'
              fontFamily='Aboreto' maxWidth='70ch' margin='0 auto' component='h1'
              fontSize={'3.8rem'} fontWeight={'100'} textTransform='capitalize'
            >{model.name}</Typography>
            <ModelDataDetails model={model} />
            <Grid container columns={2} gap={3} mx='auto' width='90vw' maxWidth='600px' justifyContent='center'>
              <Grid item xs={2} md={2}>
                <NextLink passHref
                  href={`/models/${model.name}?id=${model.id}&editDetails=true`} as={`/models/${model.name}?editDetails=true`}>
                  <Button sx={{ width: '100%' }} size='small' color='primary' variant='contained'>
                    Edit Details
                  </Button>
                </NextLink>
              </Grid>
              <Grid item xs={2} md={.95}>
                <NextLink passHref style={{ width: '100%', display: 'block' }}
                  href={`/models/${model.name}?id=${model.id}&polaroidsOverview=true`} as={`/models/${model.name}?polaroidsOverview=true`}>
                  <Button sx={{ width: '100%', fontSize: '1.2rem' }} component='span' size='large' color='primary' variant='contained' >
                    Manage Polaroids
                  </Button>
                </NextLink>
              </Grid>
              <Grid item xs={2} md={.95}>
                <NextLink passHref style={{ width: '100%', display: 'block' }}
                  href={`/models/${model.name}?id=${model.id}/portfolio`} as={`/models/${model.name}/portfolio`}>
                  <Button component='span' sx={{ width: '100%', fontSize: '1.2rem' }} size='large' color='primary' variant='contained' >
                    Manage Portfolio
                  </Button>
                </NextLink>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  )
}

export default ModelOverview