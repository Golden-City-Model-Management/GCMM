
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { NavLinkListItemWithSubLinks, } from '@/components/common/Links'
import { navLinks } from '@/constants/links'
import Mapper from '@/components/Mapper'
import React, { HTMLAttributeAnchorTarget, useCallback } from 'react'

const AdminNavigationMobile = ({ toggleShowNav }: {
  toggleShowNav: (e: React.ChangeEvent<HTMLAnchorElement>) => void
}) => {

  const handleToggle = useCallback((e: React.ChangeEvent<HTMLAnchorElement>) => {
    toggleShowNav(e)
  }, [toggleShowNav])

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
            itemProps={{ variant: 'mainNavLink', onClick: (e: React.ChangeEvent<HTMLAnchorElement>) => handleToggle(e) }} />
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

