

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { rounded } from '@/styles/styles'


const UserImage = ({ avatar }: {
  avatar: {
    src: string;
    alt: string;
  }
}) => {

  return (
    <Box sx={{
      width: 70, 
      height: 70, 
      ...rounded().circle,
      }}>
    <Avatar
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
}

export default UserImage