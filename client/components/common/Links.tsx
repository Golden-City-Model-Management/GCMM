
import { useRouter } from "next/router"
import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';
import List from '@mui/material/Link'
import { ListItem } from "@mui/material"
import { SvgIconComponent } from "@mui/icons-material"
import useToggle from '@/utils/hooks/useToggle'
import Mapper from '@/components/common/Mapper'

interface LinkInterface {
  name: string | SvgIconComponent,
  to: string,
  onClick?: () => void,
}
interface LinkWithSubLinks extends LinkInterface {
  subLinks?: LinkInterface[],
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
      cursor: 'pointer',
      zIndex: 10,
      color: isActive ? theme.palette.text.secondary : theme.palette.text.primary,
     })}
     >{typeof link.name === 'string' ? link.name : <Icon />}</MUILink>
   </WithNextLink>
  </ListItem>
  )
} 



const NavLinkListItemWithSubLinks = ({
  link
}: {
  link: LinkWithSubLinks
}) => {
  const [showSubLinks, toggleShowSubLinks] = useToggle(false)

  const router = useRouter()
  const isActive = router.asPath === link.to
  const Icon = link.name
  const subLinks = link.subLinks as any[]

  return (
    <ListItem 
      component='div'
      onMouseOver={() => toggleShowSubLinks(true)}
      onMouseEnter={() => toggleShowSubLinks(true)}
      onMouseLeave={() => toggleShowSubLinks(false)}
      onMouseOut={() => toggleShowSubLinks(false)}
      sx={(theme) => ({
        position: 'relative',
       '&:hover':{
         color: theme.palette.text.secondary,
        }
    })}>
      <WithNextLink href={link.to} passHref>
        <MUILink
         variant='mainNavLink'
         sx={theme => ({
          color: isActive ? theme.palette.text.secondary : theme.palette.text.primary,
        })}>
          {typeof link.name === 'string' ? link.name : <Icon />}
        </MUILink>
      </WithNextLink>
      <List 
        onMouseLeave={() => toggleShowSubLinks(false)}
        onMouseOut={() => toggleShowSubLinks(false)}
        sx={(theme) => ({
          display: showSubLinks ? 'block' : 'none',
          position: 'absolute',
          top: {
            xs: '0',
            md: '100%',
          },
          left: {
            xs: '30%',
            md: '0',
          },
          zIndex: 10,
          background: theme.adminPalette.main
        })}
      >
        <Mapper
          itemName='link'
          list={subLinks}
          ComponentItem={LinkListItem}
          mapKey='to'
          itemProps={{variant:'subNavLink'}}
        />
      </List>
    </ListItem>
  )
}

export { WithNextLink, LinkListItem, NavLinkListItemWithSubLinks }