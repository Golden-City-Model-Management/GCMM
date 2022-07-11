

import { LogoDesktop, LogoMobile } from '@/components/svgs/Logos';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';


const logoAlt = 'golden city model managemnt logo. A Capital Letter C enclosing a capital letter G'

const HideInDesktop = (
  { children, mobile } :  
  {children: React.ReactElement, mobile: boolean}) => {
 
  const logoStyle = { display: 
    { 
      lg: mobile ? 'none' : 'flex', 
      xs: !mobile ? 'none' :'flex' 
    }}

  return(
    <Box sx={logoStyle}>
      {children}
    </Box>
  )
}

const Header = ({ showMenuBtnAlways, handleMenuBtnClick,
 }: { showMenuBtnAlways: boolean,  handleMenuBtnClick?: () => void }) => {

  const MenuBtn = 
   <Button
    disableFocusRipple
    disableRipple
    component='button'
    variant='text'
    color='inherit'
    sx={{fontSize: '1.5rem'}}
    onClick={handleMenuBtnClick ? handleMenuBtnClick : () => {}}> 
      { showMenuBtnAlways ? 'menu' :
       <MenuIcon
        sx={{ fontSize: 40, color: '#fff'  }} /> }
    </Button>

  const appBarSx = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: {
      lg: '0  8rem',
      md: '0 3rem',
      xs: '0 1.2rem',
    },
    top: 0, left: 0, right: 0
  }

  return ( 
    <AppBar 
      position="sticky" 
      sx={appBarSx} >
      <>
      <Button 
      variant='text' 
      href='/'>
        <HideInDesktop children={<LogoDesktop />} mobile={false} />
        <HideInDesktop children={<LogoMobile />} mobile={true} />
      </Button>
      {
        showMenuBtnAlways ?
       {MenuBtn} :
        <HideInDesktop 
          children={MenuBtn} 
          mobile={!showMenuBtnAlways} />
      }
     </>
    </AppBar>
  )
}

export default Header