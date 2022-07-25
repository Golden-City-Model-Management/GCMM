
import { useRouter } from "next/router"
import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';
import { ListItem } from "@mui/material"
import { SvgIconComponent } from "@mui/icons-material"

const LinkListItem = ({link, variant, onClick}: {
  link: {
    name: string | SvgIconComponent,
    to: string,
    onClick?: () => void,
  },
  variant?: 'mainNavLink' | 'subNavLink'  
}) => {

  const router = useRouter()
  const isActive = router.asPath === link.to
  const Icon = link.name
  
  return (
    <ListItem sx={{padding: '0 0 16px 0'}}>
    <NextLink href={link.to} passHref>
     <MUILink
     onClick={() => onClick && onClick() && console.log('clicked')}
     href={link.to}
     variant={variant} 
     sx={(theme) => ({
      color: isActive ? theme.palette.text.secondary : theme.palette.text.primary,
      textTransform: 'capitalize',
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.text.secondary,
        textDecoration: 'none'
      }
     })}
     >{typeof link.name === 'string' ? link.name : <Icon /> }</MUILink>
   </NextLink>
  </ListItem>
  )
}

const WithNextLink = ({children, href, passHref }:
  {children: React.ReactNode,
  href: string,
  passHref: boolean 
 }) => {

  return(
    <NextLink href={href} passHref={passHref}>
      {children}
   </NextLink>
  )
}

export { WithNextLink, LinkListItem }