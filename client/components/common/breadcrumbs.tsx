import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import NextLink from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
export default function CustomizedBreadcrumbs({ crumbs, currentPath }: {
  crumbs: crumb[], currentPath: string,
}) {
  const isHome = currentPath === '/'
  return (
    <div role="presentation">
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <StyledBreadcrumb
          sx={{color: isHome ? 'gold' : ''}}
          component={isHome ? 'span' : 'a'}
          href="/"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        {
          crumbs.map(crumb => {
            return <CrumbLink key={crumb.label} crumb={crumb} />
          })
        }
      </Breadcrumbs>
    </div>
  );
}


