
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { NavLinkListItemWithSubLinks, } from '@/components/common/Links'
import { navLinks } from '@/constants/links'
import Mapper from '@/components/Mapper'
import { useEffect, useState } from 'react'

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

