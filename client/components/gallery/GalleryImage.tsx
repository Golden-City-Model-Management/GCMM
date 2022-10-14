
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Image from 'next/image'

const GalleryImage = ({ component, item, }: { [x: string]: any}) => {


  return (
    <Card component={component} sx={t => ({ color: t.palette.primary.contrastText,
      bgcolor: 'transparent', position: 'relative',boxShadow: '0px 0px 10px 0px #ffdd260a' })}> 
      <CardMedia component='div' sx={{ width: '90vw', maxWidth: '280px', 
       height: '350px', position: 'relative'}}>
        <Image src={item.secure_url} alt='' layout='fill' />
      </CardMedia>
    </Card>
  )
}

export default GalleryImage