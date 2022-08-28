
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { NavLinkListItemWithSubLinks, } from '@/components/common/Links'
import { navLinks } from '@/constants/links'
import Mapper from '@/components/Mapper'
import { useEffect, useState } from 'react'

export const AdminNavigationDesktop = () => {

  const [isScrolling, setIsScrolling] = useState(false)
  useEffect(() => {

    window.addEventListener('scroll', () => {
      if(window.scrollY > 20) setIsScrolling(true)
      else setIsScrolling(false)
    })
    if(window.document){
      console.dir(window.scrollY)
    }
    return () => {
      window.removeEventListener('scroll', () => {
        if(window.scrollY > 20) setIsScrolling(true)
        else setIsScrolling(false)
      })
    }
  }, [])
  return (
    <Box position={'sticky'} justifyContent='center'
      alignItems='center' top={0} left={0} 
      zIndex={isScrolling ? 0 : 2000} boxShadow='0 18px 10px 0px #0000001f'
      right={0} maxWidth='94vw' mx='auto' sx={theme => ({
        display: 'none',
        background: theme.palette.primary.light,
        [theme.breakpoints.up('md')]: {
          display: 'flex'
        }
      })}>
      <List 
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '22%',
        })} >
        <Mapper
          itemName='link'
          list={navLinks}
          ComponentItem={NavLinkListItemWithSubLinks}
          mapKey='to'
          itemProps={{background: true}} />
      </List>
    </Box>
  )
}

const AdminNavigationMobile = () => {
  return (
    <Box>
      <Box >
        <List sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: 7,
        }} >
          <Mapper
            itemName='link'
            list={navLinks}
            ComponentItem={NavLinkListItemWithSubLinks}
            mapKey='to'
            itemProps={{ variant: 'mainNavLink' }} />
        </List>
        <Typography
          sx={(theme) =>
          ({
            color: theme.palette.text.primary,
            textTransform: 'capitalize',
          })}
          variant='small'
          component='small'>
          &copy; GOLDEN CITY MODEL MANAGEMENT {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}

export default AdminNavigationMobile

