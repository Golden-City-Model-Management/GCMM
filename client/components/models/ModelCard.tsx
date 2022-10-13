import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Image from 'next/image'
import Bg from '@/public/assets/images/BG-03.jpg'
import CardContent from '@mui/material/CardContent'
import { ElementType, useState } from 'react'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import {  Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import LaunchIcon from '@mui/icons-material/Launch'
import { WithNextLink } from '../common/Links'

const ModelCard = ({ component, model, }: {
  component: ElementType<any>,
  model: any
}) => {

  const [hovered, setHovered] = useState(false)

  return (
    <Card component={component} sx={t => ({ color: t.palette.primary.contrastText,
      bgcolor: 'transparent', position: 'relative',boxShadow: '0px 0px 10px 0px #ffdd260a' })}> 
      <CardMedia component='div' sx={{ width: '90vw', maxWidth: '280px', 
       height: '350px', position: 'relative', filter: hovered ? 'blur(4px)' : 'none' }}>
        <Image src={model.cover_image.secure_url} alt='' layout='fill' />
      </CardMedia>
      <CardContent onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={t => ({
          position: 'absolute', width: '100%', height: '85%',
          top: 0, left: 0, backgroundColor: '#0d0d0d80', padding: '24px 18px',
          transform: hovered ? 'none' : 'translateY(10px)' ,
          opacity: hovered ? 1 : 0, transition: t.transitions.create('all', {
            delay: '0ms', duration: '.2s', easing: 'linear'
          }), display: 'flex', flexDirection: 'column', justifyContent: 'end', gap: 0, alignItems: 'start'
        })}>
        <Typography variant='subtitle1' component='p' textTransform='capitalize' color='secondary' 
        textAlign='center' fontWeight={800} >height {model.height}<>cm</></Typography> 

        <Typography variant='subtitle1' component='p' textTransform='capitalize' color='secondary' 
        textAlign='center' fontWeight={800} >{model.gender === 'female' ? <>bust</> : <>chest</>} 
        &nbsp;{model.gender === 'female' ? model.bust : model.chest}<>cm</></Typography> 

        <Typography variant='subtitle1' component='p' textTransform='capitalize' color='secondary' 
        textAlign='center' fontWeight={800} >waist {model.waist}<>cm</></Typography>

        <Typography variant='subtitle1' component='p' textTransform='capitalize' color='secondary' 
        textAlign='center' fontWeight={800} >hips {model.hips}<>cm</></Typography>

        <Typography variant='subtitle1' component='p' textTransform='capitalize' color='secondary' 
        textAlign='center' fontWeight={800} >shoe {model.shoe} UK</Typography>

        <Typography variant='subtitle1' component='p' textTransform='capitalize' color='secondary' 
        textAlign='center' fontWeight={800} >eyes {model.eye_color}</Typography>

        <Typography variant='subtitle1' component='p' textTransform='capitalize' color='secondary' 
        textAlign='center' fontWeight={800} >hair {model.hair_color}</Typography>

      </CardContent>
      <CardActionArea sx={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
        <WithNextLink href={`/models/${model.gender}/${model.slug}`} passHref>
          <Typography component='div' lineHeight={1}>
          <Typography variant='h6' component={'p'} lineHeight={0} fontWeight={900} textAlign='right'>
            {model.first_name}
           </Typography>
          <br />
          <Typography variant='h6' textAlign='right' component={'p'} lineHeight={0} fontWeight={900}> 
           {model.last_name}
          </Typography>
          </Typography>
        </WithNextLink>
        <CardActions>
          <WithNextLink href={`/models/${model.gender}/${model.slug}`} passHref>
            <IconButton color='secondary'>
              <LaunchIcon />
            </IconButton>
          </WithNextLink>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default ModelCard