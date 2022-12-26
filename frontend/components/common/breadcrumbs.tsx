import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import NextLink from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/router'

type crumb = {
  href: string, label: string, isActive: boolean
}
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.primary.main
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.primary.contrastText,
    fontWeight: '600',
    fontSize: '1rem',
    textTransform: 'capitalize',
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

const CrumbLink = ({ crumb }: { crumb: crumb }) => {

  return (
    crumb.isActive ?
      <StyledBreadcrumb
        style={{color: crumb.isActive ? 'gold' : 'inherit'}}
        component={'span'}
        label={crumb.label.replace('%20', ' ')} />
      :
        <NextLink style={{color: 'inherit'}} href={crumb.href}>
          <StyledBreadcrumb
            component={'a'}
            href={crumb.href}
            label={crumb.label.replace('%20', ' ')} />
        </NextLink>
  )
}
export default function CustomizedBreadcrumbs() {
  const router = useRouter()
  const paths = router.asPath.split('/').filter((x: string) => x)
  const crumbs = paths.map((path: string, idx: number) => {
    return ({
      href: `/${paths.slice(0, idx + 1).join('/')}`,
      label: path.split('?')[0], isActive: paths[paths.length - 1] === path
    })
  })
  const isHome = router.asPath === '/'
  return (
    <div role="presentation">
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <NextLink href='/' passHref>
        <StyledBreadcrumb
          sx={{color: isHome ? 'gold' : ''}}
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        </NextLink>
        {
          crumbs.map(crumb => {
            return <CrumbLink key={crumb.label} crumb={crumb} />
          })
        }
      </Breadcrumbs>
    </div>
  );
}


