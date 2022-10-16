

import { NextPageWithLayout } from '@/types/pages'
import LayoutTwo from '@/components/layout/LayoutTwo'
import getLayout from '@/utils/pages/getLayout'
import Box from '@mui/material/Box'
import { GetStaticPaths, GetStaticProps } from 'next'
import Request from '@/utils/client/request'
import CardMedia from '@mui/material/CardMedia'
import Image from 'next/image'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import BrokenImage from '@mui/icons-material/BrokenImage'
import { WithNextLink } from '@/components/common/Links'
import { useRouter } from 'next/router'

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await Request({ path: '/models?fields=slug', method: 'get', })
  const paths = await response.docs.map((el: {
    slug: string, age: number, id: string
  }) => ({ params: { slug: el.slug.toString() } }))
  return {
    paths,
    fallback: true
  }
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug
  const response = await Request({ path: `/models/${slug}`, method: 'get' })
  const model = await response.model
  return {
    props: {
      model,
      status: response.status, message: response.message,
      statusCode: response.statusCode
    }
  }
}

const Model: NextPageWithLayout = ({
  model
}) => {
  const router = useRouter()

  return (
    <Box display='flex'  flexWrap={{ lg: 'nowrap', xs: 'wrap' }} rowGap={'30px'}
     justifyContent='space-between' alignItems='center' mt={9}>
      <Card elevation={0} sx={{
        backgroundColor: 'transparent', display: 'flex', flexWrap: { md: 'nowrap', xs: 'wrap' },
        alignItems: 'end', padding: 0, width: { md: '70%' }, margin: {xs: 'auto', lg: '0'}
      }}>
        <CardMedia sx={{ width: '100%', height: '37vmax', maxHeight: { lg: '600px'}, maxWidth: { xs: '250px', lg: '450px'}, 
        position: 'relative', margin: { xs: '0 auto', lg: '0'} }} >
          <Image src={model.cover_image.secure_url} layout='fill' alt={model.name} />
        </CardMedia>
        <Box>
          
          <CardContent sx={{
            display: 'flex', flexDirection: { xs: 'row', md: 'column' }, flexWrap: 'wrap',
            alignItems: { xs: 'center', md: 'start'}, justifyContent: 'center', columnGap: 3
          }}>
            <Typography variant='h1' component='h1' textTransform='capitalize'
              color='secondary' sx={{ fontFamily: '"Poppins", sans-serif' }}
              fontWeight={800} > {model.first_name} {model.last_name}</Typography>
            <Typography variant='subtitle1' component='p' textTransform='capitalize'
              fontWeight={800} whiteSpace='nowrap' >height {model.height}<>cm</></Typography>

            <Typography variant='subtitle1' component='p' textTransform='capitalize'
              fontWeight={800} whiteSpace='nowrap' >{model.gender === 'female' ? <>bust</> : <>chest</>}
              &nbsp;{model.gender === 'female' ? model.bust : model.chest}<>cm</></Typography>

            <Typography variant='subtitle1' component='p' textTransform='capitalize'
              fontWeight={800} whiteSpace='nowrap' >waist {model.waist}<>cm</></Typography>

            <Typography variant='subtitle1' component='p' textTransform='capitalize'
              fontWeight={800} whiteSpace='nowrap' >hips {model.hips}<>cm</></Typography>

            <Typography variant='subtitle1' component='p' textTransform='capitalize'
              fontWeight={800} whiteSpace='nowrap' >shoe {model.shoe} UK</Typography>

            <Typography variant='subtitle1' component='p' textTransform='capitalize'
              fontWeight={800} whiteSpace='nowrap' >eyes {model.eye_color}</Typography>

            <Typography variant='subtitle1' component='p' textTransform='capitalize'
              textAlign='center' fontWeight={800} whiteSpace='nowrap' >hair {model.hair_color}</Typography>
          </CardContent>
          <CardActions sx={{ padding: '0', margin: { lg: '18px 0 0 15px', xs: '5px auto 0'}, justifyContent: 'center' }}>
            <WithNextLink passHref href={`/${router.asPath.split('/')[1]}/${model.slug}/portfolio`}>
              <Button variant='outlined' color='inherit'>Portfolio</Button>
            </WithNextLink>&nbsp;&nbsp;
            <WithNextLink passHref href={`/${router.asPath.split('/')[1]}/${model.slug}/polaroids`}>
              <Button variant='outlined' color='inherit'>Polaroids</Button>
            </WithNextLink>
          </CardActions>
        </Box>
      </Card>
      <Grid container gap={3} sx={{ width: { lg: '45%', xs: '100%' },
       height: { lg: '37vmax', xs: '60vmax' }, }} justifyContent='center' flexWrap='wrap' alignItems='center' >
        {
          Object.keys(model.polaroids).filter(el => el !== '_id').map(el => (
            <Card key={el} elevation={0} sx={{
              backgroundColor: 'transparent', width: '50%', maxWidth: { md: '45%'},
              height: { lg: '17.5vmax', xs: '30vmax' }, position: 'relative'
            }}>
              <CardMedia sx={{ width: '100%', height: '100%', position: 'relative', fontSize: '10px' }} >
                {
                  model.polaroids[el].secure_url ?
                  <Image src={model.polaroids[el].secure_url} layout='fill' alt={el} /> :
                  <><BrokenImage sx={{opacity: '.4'}} /> {el}</>
                }
              </CardMedia>
            </Card>
          )) 
        }
      </Grid>
    </Box>
  )
}

const props = {
  title: 'Golden City Model Management',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
}

Model.getLayout = getLayout(LayoutTwo, props)

export default Model