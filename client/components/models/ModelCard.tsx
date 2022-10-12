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

const ModelCard = ({ component }: {
  component: ElementType<any>
}) => {

  const [hovered, setHovered] = useState(false)

  return (
    <Card component={component} sx={t => ({ color: t.palette.primary.contrastText,
      bgcolor: t.palette.primary.dark, position: 'relative',boxShadow: '0px 0px 10px 0px #ffdd262e' })}> 
      <CardMedia component='div' sx={{ width: '90vw', maxWidth: '320px',
       height: '400px', position: 'relative', }}>
        <Image src={Bg.src} alt='' layout='fill' />
      </CardMedia>
      <CardContent onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={t => ({
          position: 'absolute', width: '100%', height: '85%',
          top: 0, left: 0, bgcolor: '#0d0d0de8', padding: '24px 18px',
          opacity: hovered ? 1 : 0, transition: t.transitions.create('opacity', {
            delay: '0ms', duration: '.2s', easing: 'linear'
          }), display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2
        })}>
        <Typography variant='subtitle1' textTransform='capitalize' color='secondary' 
        textAlign='center' fontWeight={800} >height - 183<>cm</></Typography> 
        <Typography variant='subtitle1' textTransform='capitalize' color='secondary' 
        textAlign='center' fontWeight={800} >bust - 32<>&#34;</></Typography> 
        <Typography variant='subtitle1' textTransform='capitalize' color='secondary' 
        textAlign='center' fontWeight={800} >waist - 22<>&#34;</></Typography> 
        <Typography variant='subtitle1' textTransform='capitalize' color='secondary' 
        textAlign='center' fontWeight={800} >hips - 32<>&#34;</></Typography> 
        <Typography variant='subtitle1' textTransform='capitalize' color='secondary' 
        textAlign='center' fontWeight={800} >shoe - 32</Typography> 
      </CardContent>
      <CardActionArea sx={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
        <WithNextLink href={'/haley-thomas'} passHref>
          <Typography component='div' lineHeight={1}>
          <Typography variant='h6' component={'p'} lineHeight={0} fontWeight={900} textAlign='right'>Haley </Typography>
          <br />
          <Typography variant='h6' component={'p'} lineHeight={0} fontWeight={900}> Thomas
          </Typography>
          </Typography>
        </WithNextLink>
        <CardActions>
          <WithNextLink href={'/haley-thomas'} passHref>
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