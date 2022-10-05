
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
import React from 'react';

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

  return (
    <AdminLayout title='Model Applications' description='Applications from aspiring models.'>
      <Box>
        <Typography variant='caption' component='h1' textAlign='center' mx='auto' my={5}>
          Applications
        </Typography>
        {
          applications.length === 0 && <Typography textAlign='center' >No Model Applications</Typography>
        }
        <List>
          {
            applications.map(app => {
              return (
                <React.Fragment key={app._id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={app.polaroids.close_up.secure_url}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {app.first_name}&nbsp;{app.last_name}
                        </Typography>
                        <Typography variant="body2" component='h4' color="text.secondary">
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
                        <Typography component='h5'>
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
                    </CardActionArea>
                    <CardActions>
                      <Button href={`mailto:${app.email}`} size="small" color="primary">
                        Reply via email
                      </Button>
                      <Button href={`tel:${app.phone}`} size="small" color="primary">
                        call 
                      </Button>
                    </CardActions>
                  </Card>
                </React.Fragment>
              )
            })
          }
        </List>
      </Box>
    </AdminLayout>
  )
}

export default Applications