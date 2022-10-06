
import AdminLayout from '@/components/layout/Layout'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import { Polaroids } from '@/types/models';
import React, { useState, useCallback } from 'react';
import { GetStaticProps } from 'next'
import Request from '@/utils/api/request';
import Lightbox from '@/components/Lightbox';
import Carousel from '@/components/Carousel';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';

export const getStaticProps: GetStaticProps = async () => {
  const response = await Request({ path: '/model-applications?limit=10&page=1', method: 'get', })

  return {
    props: {
      applications: response.docs || [],
      statusCode: response.statusCode || 0,
      message: response.message || '',
      status: response.status || ''
    }
  }
}
interface Applicant {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  dob: string,
  polaroids: Polaroids,
  gender: string,
  height: number,
  bust?: number,
  chest?: number,
  hips: number,
  waist: number,
  shoe: number,
  country: string,
  city: string,
  hair_color: string,
  instagram?: string,
  _id: string,
  age: number,
}
const Applications = ({
  applications = [],
}: {
  applications: Applicant[]
}) => {

  const [currentActivePols, setCurrentActivePols] = useState('')
  const [stateApplications, setStateApplications] = useState(applications)
  const handleDelete = useCallback(async (id: string) => {
    console.log(id)
    setStateApplications(prev => {
      return prev.filter(item => item._id !== id)
    })
    await Request({ path: `/model-applications/${id}`, method: 'delete', })
  }, [])
  return (
    <AdminLayout title='Model Applications' description='Applications from aspiring models.'>
      <Box>
        <Typography variant='caption' component='h1' textAlign='center' mx='auto' my={5}>
          Applications
        </Typography>
        {
          applications.length === 0 && <Typography textAlign='center' >No Model Applications</Typography>
        }
        <List sx={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 20%))', minHeight: '70vh', justifyContent: 'space-around',
          alignItems: 'center', padding: { xs: '1rem', md: '2rem 1.5rem', lg: '1rem 6rem' }, rowGap: '10%'
        }}>
          {
            stateApplications.map(app => {
              return (
                <React.Fragment key={app._id}>
                  <Card sx={t => ({ backgroundColor: t.palette.primary.light, color: t.palette.getContrastText(t.palette.primary.light) })}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={app.polaroids.close_up.secure_url}
                      alt="green iguana"
                    />
                    <Button
                      sx={t => ({ fontSize: '1rem', margin: '0 auto', display: 'block', textAlign: 'center' })}
                      onClick={() => setCurrentActivePols(app._id)} size="small" color="inherit" variant="outlined" >
                      view polaroids
                    </Button>
                    <CardContent>
                      <Typography component='h3' gutterBottom variant="h3" textTransform='capitalize' >
                        {app.first_name}&nbsp;{app.last_name}
                      </Typography>
                      <Typography variant="h6" component='h4' color="text.secondary">
                        statistics
                      </Typography>
                      <Typography>
                        gender - {app.gender}
                      </Typography>
                      <Typography>
                        {app.gender === 'female' ? 'bust' : 'chest'} - {app.gender === 'female' ? app.bust : app.chest}
                      </Typography>
                      <Typography>
                        height - {app.height}cm
                      </Typography>
                      <Typography>
                        hips - {app.hips}cm
                      </Typography>
                      <Typography>
                        shoe - {app.shoe}cm
                      </Typography>
                      <Typography>
                        waist - {app.waist}cm
                      </Typography>
                      <Typography component='h5' color='secondary'>
                        Other Info
                      </Typography>
                      <Typography>
                        hair color - {app.hair_color}
                      </Typography>
                      <Typography>
                        location - {app.city}&nbsp;{app.country}
                      </Typography>
                      <Typography>
                        instagram - {app.instagram || 'N/A'}
                      </Typography>
                    </CardContent>
                    <CardActionArea>
                      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          sx={t => ({ fontSize: '1rem' })}
                          href={`mailto:${app.email}`} size="small" color="inherit" variant="outlined" >
                          Reply via email
                        </Button>
                        <Button
                          sx={t => ({ fontSize: '1rem' })}
                          href={`tel:${app.phone}`} size="small" variant="outlined" color='inherit'>
                          call
                        </Button>
                        <IconButton
                          sx={t => ({ fontSize: '1rem', })}
                          onClick={() => handleDelete(app._id)} size="small" color='inherit'>
                          <Delete fontSize={'small'} />
                        </IconButton>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                </React.Fragment>
              )
            })
          }
        </List>
      </Box>
      <Lightbox showCloseBtn isOpen={currentActivePols.length > 0} title={'gvhjmjbhgvbbjhv'} close={() => setCurrentActivePols('')}   >
        <Box position='absolute' width='80%' height='100%' top='10%' left='10%'>
          <Carousel carouselItems={
            currentActivePols.length > 0 ?
              Object.values(applications.find(application => application._id === currentActivePols).polaroids)?.map(el => el.secure_url).map(item => {

                return (
                    <Card  key={item}>
                      <CardMedia
                        component="img"
                        height="100%"
                        width='100%'
                        image={item}
                        alt="green iguana"
                      />
                    </Card>
                )
              })
              : []
          } />
        </Box>

      </Lightbox>
    </AdminLayout>
  )
}

export default Applications