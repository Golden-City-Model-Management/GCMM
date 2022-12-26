

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { NextPage } from "next"
import {
  useCallback, useState, useContext,
  FormEventHandler, FormEvent, ChangeEventHandler, ChangeEvent
} from "react"
import Request from "@/utils/api/request"
import Loader from "@/components/common/loader"
import * as styles from '@/styles/login'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AdminLayout from '@/components/layout/Layout'
import Link from 'next/link'
import { emphasize } from '@mui/material'
import { notificationActions } from '@/reducers/notification/reducer'
import { StoreContext } from '@/reducers/store'

const ForgotPassword: NextPage = () => {
  const { combinedDispatch } = useContext(StoreContext)
  const [passwordResetEmail, setPasswordResetEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit: FormEventHandler = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (passwordResetEmail.trim().length === 0)
      return  combinedDispatch.notificationDispatch({type: notificationActions.showNotification, payload: {
        message: "All fields are required!", type: "error", show: true
      }})
        setIsLoading(true)

    const response = await Request({ path: '/users/forgot-password', method: 'post', data: { email: passwordResetEmail } })
    if (response.statusCode === 200) {
      setIsLoading(false)
      console.log(response)
      combinedDispatch.notificationDispatch({type: notificationActions.showNotification, payload: {
        message: response.message, type: "primary", show: true
      }})
    } else {
      const { message } = response
      setIsLoading(false)
      combinedDispatch.notificationDispatch({type: notificationActions.showNotification, payload: {
        message, type: "error", show: true
      }})
      combinedDispatch.notificationDispatch({type: notificationActions.showNotification, payload: {
        message, type: "error", show: true
      }})
    }
  }, [combinedDispatch, passwordResetEmail])

  const handleChange: ChangeEventHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPasswordResetEmail(e.target.value)
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
            variant='h1'>Forgot Your Password?</Typography>

          <Typography
            textAlign='center'
            color={'primary'}>Please enter your email.</Typography>

          <TextField variant='outlined'  value={passwordResetEmail}
            name='email'
            type='email'
            label='Email'
            color='primary'
            aria-required
            InputLabelProps={{ sx: t => ({ color: t.palette.primary.main }) }}
            onChange={handleChange}
            sx={styles.inputStyles}
          />
          <Button type="submit" variant='outlined' size='large' color='primary' sx={styles.submitBtnStyles}>
            get new password
          </Button>
          <Link href="/login" passHref><Typography variant="small" textTransform="capitalize"
            sx={t => ({ color: emphasize(t.palette.primary.main), opacity: ".8", ml: "auto" })} component="a">
            back to login
          </Typography>
          </Link>
        </Box>
      </Box>
    </AdminLayout>
  )
}

export default ForgotPassword

