

import Link from 'next/link'
import { useContext } from 'react'
import { Link as MUILink } from '@mui/material';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PlaceIcon from '@mui/icons-material/Place';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { mainNavLinks, subNavLinks, socialLinks, } from '@/constants/links'
import { LinkListItem } from '@/components/common/Links'
import { UIContext } from '@/context/context'


const Footer = () => {
  const { universalContainerPadding } = useContext(UIContext)
  return (
    <Box component='footer' sx={(theme) => ({
      minHeight: '30vh',
      background: theme.palette.primary.light,
      padding: universalContainerPadding,
    })}>
      <Box sx={{
        padding: '40px 0',
        display: {
          md: 'flex'
        },
        justifyContent: 'space-between'
        }}>

      <Box component='ul' sx={{padding: 0, margin: 0}}>
        {[...mainNavLinks, ...subNavLinks].map(link => (<LinkListItem key={link.to} variant='subNavLink' link={link} />))}
        <Box component='ul' sx={{display: 'flex', margin: '10px 0', padding: '0', maxWidth: {
          md: '100%',
          xs: '30%'
        }}}>
          {socialLinks.map(link => (<LinkListItem key={link.to} variant='subNavLink' link={link} />))}
        </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', lineHeight: '30px'}}>
      <Typography sx={{ maxWidth: '25ch', margin: '20px 0' }} component='address'>
      <PlaceIcon  />
          No 4, Okiki imole street,<br/>
          Ikola agodo, Ipaja,<br/>
          Lagos State, Nigeria.<br/>
          PO BOX 100001
       </Typography>
       <Link passHref href='mailto:gcmm@gmail.com' >
        <MUILink color='inherit'><ForwardToInboxIcon /> &nbsp; goldencity@gcmm.com</MUILink>
       </Link>
        <Link passHref href='tel:+2348012345678' >
        <MUILink color='inherit'><LocalPhoneIcon /> &nbsp;+2348012345678</MUILink>
        </Link>
      </Box>
      </Box>
    </Box>
  )
}

export default Footer