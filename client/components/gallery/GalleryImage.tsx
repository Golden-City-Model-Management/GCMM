
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Image from 'next/image'
import { UIContext } from '@/context/context'
import { useContext, useMemo } from 'react'

const GalleryImage = ({ component, item, }: { [x: string]: any}) => {

  const { openModal } = useContext(UIContext)

  const content = useMemo(() => (
    <CardMedia component='div' sx={{ width: '100%', maxWidth: item.width, 
       height: '100%', maxHeight: item.height, position: 'relative'}}>
        <Image src={item.secure_url} alt='' layout='fill' />
      </CardMedia>
  ), [item]) 

  return (
    <Card component={component} sx={t => ({ color: t.palette.primary.contrastText,
      bgcolor: 'transparent', position: 'relative',boxShadow: '0px 0px 10px 0px #ffdd260a' })}
      onClick={() => openModal(content)}> 
      <CardMedia component='div' sx={{ width: '90vw', maxWidth: '280px', 
       height: '350px', position: 'relative'}}>
        <Image src={item.secure_url} alt='' layout='fill' />
      </CardMedia>
    </Card>
  )
}

export default GalleryImage