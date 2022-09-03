
import AdminLayout from "@/components/layout/Layout"
import { ModelWithPolaroidsAndPortfolio } from "@/types/models"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ModelDataDetails from '@/components/models/ModelData'
import PolaroidsList from '@/components/models/PolaroidsList'
import NextLink from 'next/link'

const ModelOverview = ({ model } : {model: ModelWithPolaroidsAndPortfolio}) => {

  return (
    <AdminLayout title={`${model.name} | GCMM`} description={`An overview of ${model.name}`}>
      <Box mt={6}>
        <Typography
          fontFamily='Aboreto' maxWidth='88vw' margin='0 auto' component='h1'
          fontSize={'3.5rem'} fontWeight={'100'} textTransform='capitalize'
        >{model.name}</Typography>
        <Grid width='100vw' my={0} minHeight='78vh' container columns={2} columnSpacing={3}>

          <Grid item borderTop="3px solid" borderRight="3px solid"
            borderColor={t => t.palette.secondary.main} padding='35px 0 ' xs={2} md={.8}>
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
            xs={2} md={1.1} mx={'auto'} pb='35px'>
            <Typography
              fontFamily='Aboreto' maxWidth='88vw' margin='0 auto' component='h2'
              fontSize={'1.8rem'} fontWeight={'100'} textTransform='capitalize'
            >Polaroids and Portfolio</Typography>
            <PolaroidsList polaroids={model.polaroids} />
            <Box textTransform='lowercase' display='flex' justifyContent='space-around' 
            alignItems='center' mt={5} pb={8} gap={3}  >
              <Button size='small' color='inherit' variant='outlined' sx={{fontSize: '1.2rem'}}>
                Manage Polaroids
              </Button>
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