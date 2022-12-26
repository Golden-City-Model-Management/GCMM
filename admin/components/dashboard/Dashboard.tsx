
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from "@mui/material/Box"
import * as styles from './style'
import { userState } from 'reducers/user/actionHandlers'

const DashBoard = ({ user }: {
  user: userState
}) => {

  return (
    <Box display='flex' justifyContent='center' alignItems='center' gap='1rem' 
      flexWrap='wrap'  minHeight='80vh' borderRadius={"50%"}>
      <Box width='80vw' height='80vw' maxWidth='150px' maxHeight='150px'
       display='flex' justifyContent='center' alignItems='center' 
       border={'1px solid currentColor'} borderRadius={'50%'}>
        <Avatar
          alt={user.name} src={user.avatar}
          sx={styles.AvatarSx} />
      </Box>
      <Box mt={0}>
        <Typography  variant='caption' component='h1'>Welcome Back {user.name}</Typography><br />
         <Box>
          <Typography lineHeight={2} variant='h2' textTransform='capitalize' >Username: {user.userName}</Typography>
          <Typography lineHeight={2} variant='h2' textTransform='capitalize' >Email: {user.email}</Typography>
         </Box>     
      </Box>
    </Box>
  )
}

export default DashBoard