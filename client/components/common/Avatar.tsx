

import Box from '@mui/material/Box';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import { rounded } from '@/styles/styles'
import { ElementType, forwardRef } from 'react';

interface AvatarPropsExtended extends AvatarProps {
  avatar: {
    src: string;
    alt: string;
  },
  component: ElementType<any>,
  href?: string
}

const UserImage = forwardRef<any, AvatarPropsExtended>((props, ref) => {
 const { avatar, component, href, ...rest } = props
  return (
    <Box component={component} href={href} ref={ref}>
    <Avatar
    {...rest}
      alt="Remy Sharp"
      src={avatar.src}
      sx={{ 
        width: 55, 
        height: 55,
        ...rounded().circle,
       }}
    />
    </Box>
  )
})

export default UserImage

