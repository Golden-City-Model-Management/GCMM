import Loader from "@/components/common/loader"
import AdminLayout from "@/components/layout/Layout"
import { notificationActions } from "@/reducers/notification/reducer"
import { StoreContext } from "@/reducers/store"
import { emphasize } from "@mui/material"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from 'next/link'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useRouter } from "next/router"
import { useContext, useState, FormEventHandler, useCallback, FormEvent, ChangeEventHandler, ChangeEvent, useEffect } from "react"
import Request from "@/utils/api/request"
import * as styles from "@/styles/login"


/**
 * @Abbreviations
 * prt stands for password reset token
 * uid stands for user id
*/

export default function PasswordReset() {{
  const { combinedDispatch } = useContext(StoreContext)
  const router = useRouter()
  const [newPassword, setNewPassword] = useState({
    password: "", confirmPassword: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  console.log(router)
  const handleSubmit: FormEventHandler = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if ((newPassword.password.trim().length === 0 || newPassword.confirmPassword.trim().length === 0))
      return  combinedDispatch.notificationDispatch({type: notificationActions.showNotification, payload: {
        message: "All fields are required!", type: "error", show: true
      }})
    else if((newPassword.password.length > 0 && newPassword.confirmPassword.length > 0 &&  newPassword.password !== newPassword.confirmPassword)){
      return  combinedDispatch.notificationDispatch({type: notificationActions.showNotification, payload: {
        message: "Passwords not matched!", type: "error", show: true
      }})
    }
    setIsLoading(true)
    const response = await Request({ path: `/users/password-reset/${router.query.prt}/${router.query.uid}`, 
    method: 'post', 
    data: { 
      email: "",
      password: newPassword.password
     } })
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
  }, [combinedDispatch, newPassword.confirmPassword, newPassword.password, router.query.prt, router.query.uid])

  const handleChange: ChangeEventHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(prev => ({...prev, [e.target.name]: e.target.value}))
  }, [])

  return (
    <AdminLayout hideLayout title={'Password Reset | Golden City Model Management'} description={'Reset your password'}>
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
            variant='h1'>Reset Your Password</Typography>

          <Typography
            textAlign='center'
            color={'primary'}>Please enter your new password.</Typography>

          <TextField variant='outlined'  value={newPassword.password}
            name='password'
            type='password'
            label='new password'
            color='primary'
            aria-required
            InputLabelProps={{ sx: t => ({ color: t.palette.primary.main }) }}
            onChange={handleChange}
            sx={styles.inputStyles} />
          <TextField variant='outlined'  value={newPassword.confirmPassword}
            name='confirmPassword'
            type='password'
            label='confirm new password'
            color='primary'
            aria-required
            InputLabelProps={{ sx: t => ({ color: t.palette.primary.main }) }}
            onChange={handleChange}
            sx={styles.inputStyles}
          />
          <Button type="submit" variant='outlined' size='large' color='primary' sx={styles.submitBtnStyles}>
            reset password
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
}