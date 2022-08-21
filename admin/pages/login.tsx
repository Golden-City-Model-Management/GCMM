

import { Theme } from "@mui/material"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { NextPage } from "next"
import { rounded, flexDirection, flexCenterCenter } from '../styles/styles'
import { WhiteBorderInput } from '../components/common/Inputs'
import { BasicBtn } from '../components/common/Buttons'


const formStyles = (theme: Theme) => ({
  ...flexCenterCenter,
  flexDirection: flexDirection.column,
  borderRadius: rounded().md,
  background: theme.palette.primary.contrastText,
  color: theme.palette.primary.main,
  width: '90vw',
  maxWidth: '450px',
  height: '70vh',
  maxHeight: '600px',
  gap: '26px',
})

const inputStyles = (theme: Theme) => ({
  '&.MuiInputBase-root, .MuiInput-root': {
    width: '100%',
  },
  color: theme.palette.primary.main,
  borderColor: 'currentColor',
  fontSize: '',
  '&:hover': {
    color: theme.palette.primary.main
  }
})

const labelStyles = (theme?: Theme) => ({
  width: '80%'
})

const submitBtnStyles = (theme: Theme) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: '80%',
  minHeight: '55px',
})

const AdminHomePage: NextPage = () => {



  return (
    <Box sx={{ minHeight: '100vh', ...flexCenterCenter, }}>

      <Box component='form' sx={formStyles}>

        <Typography
          sx={{ textAlign: 'center' }}
          color={theme => theme.palette.primary.main}
          variant='caption'>Welcome Back</Typography>

        <Typography
          sx={{ textAlign: 'center' }}
          color={'rgba(0, 0, 0, 0.6)'}
          variant='small'>Please sign in to continue</Typography>
        
        <Box component='label' sx={labelStyles}>
          <Box>Username / Email</Box>
          <WhiteBorderInput sx={inputStyles} />
        </Box>

        <Box component='label' sx={labelStyles}>
          <Box>Password</Box>
          <WhiteBorderInput sx={inputStyles} />
        </Box>

        <BasicBtn sx={submitBtnStyles}>
          Log In
        </BasicBtn>
      </Box>
    </Box>
  )
}


export default AdminHomePage 