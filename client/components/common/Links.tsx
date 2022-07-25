import { SvgIconComponent } from "@mui/icons-material"
import { ListItem } from "@mui/material"
import { useRouter } from "next/router"
import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';

export const LinkListItem = ({link, variant,}: {
  link: {
    name: string | SvgIconComponent,
    to: string
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
