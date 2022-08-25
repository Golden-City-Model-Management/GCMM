
import { rounded, flexJCenterACenter } from '@/styles/styles'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from "@mui/material/Box"
import { StyledBorderBtn } from '../Buttons/Buttons'
import * as styles from './style'

const DashBoard = ({ user }: {
  user: {
    _id: string,
    name: string,
    avatar: string,
    userName: string,
    email: string,
    role: string,
  }
}) => {

  return (
    <Box 
     display='flex' justifyContent='center' alignItems='center'
     gap='1rem' flexWrap='wrap'  minHeight='80vh' sx={{...rounded().circle,}}>
      <Box
       width='80vw' height='80vw' maxWidth='320px' maxHeight='320px'
       display='flex' justifyContent='center' alignItems='center' 
       sx={theme => ({
        border: `1px solid ${theme.palette.primary.contrastText}`,
        ...rounded().circle,
       })}>
        <Avatar
          alt={user.name} src={user.avatar}
          sx={styles.AvatarSx} />
      </Box>
      <Box mt={0}>
        <Typography textAlign='center' variant='caption' component='h1'>Welcome Back {user.name}</Typography><br />
        <Box display='flex' justifyContent='center' alignItems='center' gap={3} mt={4}>
          <StyledBorderBtn href='/me' >
            Profile
          </StyledBorderBtn>
          <StyledBorderBtn href='/me/settings' >
            Settings
          </StyledBorderBtn>         
        </Box>

      </Box>
    </Box>
  )
}

export default DashBoard