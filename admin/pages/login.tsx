

import { GetServerSideProps } from 'next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { NextPage } from "next"
import { BorderInput } from '@/components/Inputs/Inputs'
import { BasicBtn } from '@/components/Buttons/Buttons'
import {
  useCallback, useState,
  FormEventHandler, FormEvent, ChangeEventHandler, ChangeEvent
} from "react"
import { TopCenteredSnackbar } from "@/components/common/snackbars"
import { ErrorAlert } from '@/components/common/alert'
import Request from "@/utils/client/request"
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"
import { getAccessTokenFromReq } from "@/utils/pages/getServerSideProps"
import Loader from "@/components/common/loader"
import * as styles from '@/styles/pages/login'


const AdminHomePage: NextPage = () => {

  const router = useRouter()
  const [_, setCookie] = useCookies(["access_token"])
  const [loginDetails, setLoginDetails] = useState({
    userName: '', password: ''
  })
  const [isError, setIsError] = useState({
    error: router.query.error ? true : false, message: router.query.error
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSetError = useCallback((newState: typeof isError) => {
    if (router.query.error) {
      router.push('/login')
    }
    setIsError(prev => ({ ...prev, ...newState }))
  }, [router])

  const handleSubmit: FormEventHandler = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (loginDetails.userName.trim().length === 0 || loginDetails.password.trim().length === 0)
      return handleSetError({ error: true, message: 'All fields are required!' })
    setIsLoading(true)

    const response = await Request({ path: '/login', method: 'post', data: loginDetails })
    if (response.status === 200) {
      const { data } = response
      setCookie('access_token', JSON.stringify(data.token), {
        path: '/',
        sameSite: 'lax',
        maxAge: 3600,
        secure: true
      })
      setIsLoading(false)
      router.push('/')
    } else {
      const { data: { message } } = response
      setIsLoading(false)
      return handleSetError({ error: true, message })
    }
  }, [handleSetError, loginDetails, router, setCookie])

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
        display='flex' justifyContent='center'
        alignItems='center' flexDirection='column' sx={styles.formStyles}>

        <Typography
          textAlign='center'
          color={theme => theme.palette.primary.main}
          variant='caption'>Welcome Back</Typography>

        <Typography
          textAlign='center'
          color={'rgba(0, 0, 0, 0.6)'}
          variant='small'>Please sign in to continue</Typography>

        <Box component='label' width={'80%'}>
          <Box>Username / Email</Box>
          <BorderInput required value={loginDetails.userName}
            name='userName'
            type='text'
            placeholder="Username or Email"
            onChange={handleChange}
            data-testid='email' sx={styles.inputStyles} />
        </Box>

        <Box component='label' width={'80%'}>
          <Box>Password</Box>
          <BorderInput value={loginDetails.password}
            name='password'
            type='password'
            placeholder="password"
            onChange={handleChange}
            data-testid='password' sx={styles.inputStyles} />
        </Box>

        <BasicBtn type="submit" data-testid='login' sx={styles.submitBtnStyles}>
          Log In
        </BasicBtn>
      </Box>
    </Box>
  )
}

export default AdminHomePage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = getAccessTokenFromReq(ctx.req)
  if (accessToken) {
    ctx.res.writeHead(302, {
      Location: '/admin/models'
    })
    ctx.res.end()
  }
  return {
    props: {}
  }
}
