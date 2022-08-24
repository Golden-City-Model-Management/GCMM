

import { Theme } from "@mui/material"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { NextPage } from "next"
import { rounded, flexDirection, flexCenterCenter } from '../styles/styles'
import { WhiteBorderInput } from '../components/common/Inputs'
import { BasicBtn } from '../components/common/Buttons'
import { useCallback, useState, 
  FormEventHandler, FormEvent, ChangeEventHandler, ChangeEvent } from "react"
import { TopCenteredSnackbar } from "@/components/common/snackbars"
import { ErrorAlert } from '@/components/common/alert'
import Request from "@/utils/client/request"
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"
import getUserDetails from "@/utils/pages/getServerSideProps"

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

const labelStyles = (_?: Theme) => ({
  width: '80%'
})

const submitBtnStyles = (theme: Theme) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: '80%',
  minHeight: '55px',
})

const AdminHomePage: NextPage = () => {

  const router = useRouter()
  const [_, setCookie] = useCookies(["access_token"])
  const [loginDetails, setLoginDetails] = useState({
    userName: '', password: ''
  })
  const [isError, setIsError] = useState({
    error: false, message: ''
  })

  const handleSetError = useCallback((newState: typeof isError) => {
    setIsError(prev => ({...prev, ...newState}))
    }, [])

  const handleSubmit: FormEventHandler = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if(loginDetails.userName.trim().length === 0 || loginDetails.password.trim().length === 0)
     return handleSetError({error: true, message: 'All fields are required!'})

    const response = await Request({path: '/login', method: 'post', data: loginDetails})
    if( response.status === 200) {
        const { data } = response 
        setCookie('access_token', JSON.stringify(data.token), {
          path: '/',
          sameSite: 'lax',
          maxAge: 3600,
        })
        router.push('/')
     }else {
       const { data: { message } } = response
       return handleSetError({error: true, message})
     }
  }, [loginDetails])

  const handleChange: ChangeEventHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLoginDetails(prev => ({...prev, [e.target.name]: e.target.value}))
  }, [])


  return (
    <Box sx={{ minHeight: '100vh', ...flexCenterCenter, }}>

      <TopCenteredSnackbar onClose={() => handleSetError({error: false, message: ''})} open={isError.error}>
        <ErrorAlert >
          {isError.message}
        </ErrorAlert>
      </TopCenteredSnackbar>
      <Box onSubmit={handleSubmit} component='form' sx={formStyles}>

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
          <WhiteBorderInput required value={loginDetails.userName} 
          name='userName' 
          onChange={handleChange} 
          data-testid='email' sx={inputStyles} />
        </Box>

        <Box component='label' sx={labelStyles}>
          <Box>Password</Box>
          <WhiteBorderInput value={loginDetails.password} 
          name='password' 
          onChange={handleChange} 
          data-testid='password' sx={inputStyles} />
        </Box>

        <BasicBtn type="submit" data-testid='login' sx={submitBtnStyles}>
          Log In
        </BasicBtn>
      </Box>
    </Box> 
  ) 
}

export default AdminHomePage 

export const getServerSideProps = getUserDetails
