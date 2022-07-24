

import { mainNavLinks, subNavLinks, socialLinks, NavLinkItem } from '@/components/navigation/Nav'
import Box from '@mui/material/Box'
import PlaceIcon from '@mui/icons-material/Place';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { Link as MUILink } from '@mui/material';
import { useContext } from 'react'
import { UIContext } from '@/context/ui'


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
        {[...mainNavLinks, ...subNavLinks].map(link => (<NavLinkItem key={link.to} variant='subNavLink' link={link} />))}
        <Box component='ul' sx={{display: 'flex', margin: '10px 0', padding: '0', maxWidth: {
          md: '100%',
          xs: '30%'
        }}}>
          {socialLinks.map(link => (<NavLinkItem key={link.to} variant='subNavLink' link={link} />))}
        </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', lineHeight: '30px'}}>
      <Typography sx={{ maxWidth: '25ch', margin: '20px 0' }} component='address'>
      <PlaceIcon  />
          #20 Street Address,<br/>
          Town Address, City,<br/>
          State, Nigeria.<br/>
          PO BOX 32342
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