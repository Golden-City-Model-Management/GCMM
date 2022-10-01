

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { NextPage } from "next"
import {
  useCallback, useState,
  FormEventHandler, FormEvent, ChangeEventHandler, ChangeEvent
} from "react"
import { TopCenteredSnackbar } from "@/components/common/snackbars"
import { ErrorAlert } from '@/components/common/alert'
import Request from "@/utils/api/request"
import { useRouter } from "next/router"
import Loader from "@/components/common/loader"
import * as styles from '@/styles/login'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import useLogin from '@/utils/pages/useLogin'


const AdminHomePage: NextPage = () => {

  useLogin({ redirectTo: '/', redirectIfFound: true })
  const router = useRouter()
  const [loginDetails, setLoginDetails] = useState({
    userName: '', password: ''
  })
  const [isError, setIsError] = useState({
    error: router.query.error ? true : false, message: router.query.error
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSetError = useCallback((newState: typeof isError) => {
    setIsError(prev => ({ ...prev, ...newState }))
  }, [])

  const handleSubmit: FormEventHandler = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (loginDetails.userName.trim().length === 0 || loginDetails.password.trim().length === 0)
      return handleSetError({ error: true, message: 'All fields are required!' })
    setIsLoading(true)

    const response = await Request({ path: '/users/login', method: 'post', data: loginDetails })
    if (response.statusCode === 200) {
      console.log(response.status, 'logged in')
      setIsLoading(false)
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      const { message } = response
      setIsLoading(false)
      return handleSetError({ error: true, message })
    }
  }, [handleSetError, loginDetails, router])

  const handleChange: ChangeEventHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLoginDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])


  return (
    <Box display='flex' justifyContent='center'
      alignItems='center' minHeight='100vh' >
      <Loader open={isLoading} />
      <TopCenteredSnackbar onClose={() => handleSetError({ error: false, message: '' })} open={isError.error}>
        <ErrorAlert >
          {isError.message}
        </ErrorAlert>
      </TopCenteredSnackbar>
      <Box
        onSubmit={handleSubmit} component='form'
        display='flex' justifyContent='center' px={4}
        alignItems='stretch' flexDirection='column' sx={styles.formStyles}>

        <Typography
          textAlign='center'
          color={theme => theme.palette.primary.main}
          variant='caption'>Welcome Back</Typography>

        <Typography
          textAlign='center'
          color={'primary'}
          variant='small'>Please sign in to continue</Typography>

          <TextField variant='outlined' required value={loginDetails.userName}
            name='userName'
            type='text'
            label='Username or Email'
            color='primary'
            InputLabelProps={{sx: t => ({color: t.palette.primary.main})}}
            onChange={handleChange}
            data-testid='email' 
            sx={styles.inputStyles} 
              />
          <TextField variant='outlined' value={loginDetails.password}
            name='password'
            type='password'
            color='primary'
            label='password'
            InputLabelProps={{sx: t => ({color: t.palette.primary.main})}}
            onChange={handleChange}
            data-testid='password' sx={styles.inputStyles} />
        <Button type="submit" data-testid='login' variant='outlined' color='primary' sx={styles.submitBtnStyles}>
          Log In
        </Button>
      </Box>
    </Box>
  )
}

export default AdminHomePage

