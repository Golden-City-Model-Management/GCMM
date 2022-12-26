

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { NextPage } from "next"
import {
  useCallback, useState,
  FormEventHandler, FormEvent, ChangeEventHandler, ChangeEvent, useContext
} from "react"
import Request from "@/utils/api/request"
import { useRouter } from "next/router"
import Loader from "@/components/common/loader"
import * as styles from '@/styles/login'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AdminLayout from '@/components/layout/Layout'
import Link from 'next/link'
import { emphasize } from '@mui/material'
import { notificationActions } from '@/reducers/notification/reducer'
import { StoreContext } from '@/reducers/store'

const LoginPage: NextPage = () => {
  const { combinedDispatch } = useContext(StoreContext)
  const router = useRouter()
  const [loginDetails, setLoginDetails] = useState({
    user_name: '', password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit: FormEventHandler = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (loginDetails.user_name.trim().length === 0 || loginDetails.password.trim().length === 0)
      return combinedDispatch.notificationDispatch({type: notificationActions.showNotification, payload: {
        message: "All fields are required!", type: "error", show: true
      }})
    setIsLoading(true)

    const response = await Request({ path: '/users/login', method: 'post', data: loginDetails })
    if (response.statusCode === 200) {
      setIsLoading(false)
      localStorage.setItem('access_token', response.token)
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      const { message } = response
      setIsLoading(false)
      combinedDispatch.notificationDispatch({type: notificationActions.showNotification, payload: {
        message, type: "error", show: true
      }})
    }
  }, [combinedDispatch, loginDetails, router])

  const handleChange: ChangeEventHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLoginDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])


  return (
    <AdminLayout hideLayout title={'Login | Golden City Model Management'} description={'Enter your credentials to login'}>
      <Box display='flex' justifyContent='center'
        alignItems='center' minHeight='100vh' >
        <Loader open={isLoading} />
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

          <TextField variant='outlined' aria-required value={loginDetails.user_name}
            name='user_name'
            type='text'
            label='Username or Email'
            color='primary'
            InputLabelProps={{ sx: t => ({ color: t.palette.primary.main }) }}
            onChange={handleChange}
            data-testid='email'
            sx={styles.inputStyles}
          />
          <TextField variant='outlined' value={loginDetails.password}
            name='password'
            type='password'
            color='primary'
            label='password'
            InputLabelProps={{ sx: t => ({ color: t.palette.primary.main }) }}
            onChange={handleChange}
            aria-required sx={styles.inputStyles} />
          <Button type="submit" data-testid='login' variant='outlined' color='primary' sx={styles.submitBtnStyles}>
            Log In
          </Button>
          <Link href="/forgot-password" passHref><Typography variant="small" textTransform="capitalize" 
          sx={t => ({color: emphasize(t.palette.primary.main), opacity: ".8",  ml: "auto"})} component="a">
            forgot password?
            </Typography>
            </Link>
        </Box>
      </Box>
    </AdminLayout>
  )
}

export default LoginPage

