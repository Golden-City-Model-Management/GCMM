
import { useRouter } from "next/router"
import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';
import { ListItem } from "@mui/material"
import { SvgIconComponent } from "@mui/icons-material"

interface LinkInterface {
  name: string | SvgIconComponent,
  to: string,
  onClick?: () => void,
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

const LinkListItem = ({link, variant, }: {
  link: LinkInterface,
  variant?: 'mainNavLink' | 'subNavLink'
}) => {

  const router = useRouter()
  const isActive = router.asPath === link.to
  const Icon = link.name
  
  return (
    <ListItem sx={{padding: '0 0 16px 0'}}>
    <WithNextLink href={link.to} passHref>
     <MUILink
     component='span'
     onClick={() => link.onClick && link.onClick()}
     href={link.to}
     variant={variant} 
     sx={(theme) => ({
      '&.MuiLink-root': {
        textDecoration: 'none',
        textDecorationColor: 'none',
      },
      '&.MuiLink-root:hover': {
        textDecoration: 'none',
        textDecorationColor: 'none',
      },
      cursor: 'pointer',
      zIndex: 10,
      textDecoration: 'none',
      textDecorationColor: 'transparent',
      color: isActive ? theme.palette.text.secondary : theme.palette.text.primary,
     })}
     >{typeof link.name === 'string' ? link.name : <Icon />}</MUILink>
   </WithNextLink>
  </ListItem>
  )
} 


export { WithNextLink, LinkListItem }