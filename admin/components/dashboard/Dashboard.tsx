
import { rounded, flexJCenterACenter } from '@/styles/styles'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from "@mui/material/Box"
import { StyledBorderBtn } from '../Buttons/Buttons'


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
    <Box sx={() => ({
      ...flexJCenterACenter,
      gap: 5,
      flexWrap: 'wrap',
      ...rounded().circle,
    })}>
      <Box sx={theme => ({
        border: `1px solid ${theme.palette.primary.contrastText}`,
        width: '80vw',
        height: '80vw',
        maxWidth: 320,
        maxHeight: 320,
        ...flexJCenterACenter,
        ...rounded().circle,
      })}>
        <Avatar
          alt={user.name} src={user.avatar}
          sx={theme => ({
            width: '65vw',
            height: '65vw',
            maxWidth: 280,
            maxHeight: 280, fontSize: '10rem',
            border: `1px solid ${theme.palette.secondary.main}`,
            background: theme.palette.primary.dark,
          })} />
      </Box>
      <Box >
        <Typography variant='caption' >Welcome Back {user.name}</Typography><br />
        <Box sx={{...flexJCenterACenter, gap: 3, mt: 4}}>
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