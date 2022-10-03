
import AdminLayoutHeader from '@/components/header/Header'
import Box from '@mui/material/Box'
import { LayoutProps } from '@/types/layout'
import Head from './Head'
import CustomizedBreadcrumbs from '@/components/common/breadcrumbs'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, useMemo } from 'react'
import Request from '@/utils/api/request'
import { StoreContext } from '@/reducers/store'

const AdminLayout = ({ children, hideLayout, ...headProps }: LayoutProps) => {
  const [ isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const paths = router.asPath.split('/').filter(x => x)
  const {combinedDispatch: { userDispatch }, state: { user } } = useContext(StoreContext)

  useEffect(() => {
    const getUser = async () => {
      const data = await Request({path: '/users/me', method: 'get', })
      if(data.statusCode === 200){
        userDispatch({type: 'UPDATE_USER', payload: data.user})
      }else{
        !router.asPath.includes('/login') && router.push('/login')
      }
    }
    if(window.localStorage.getItem('access_token')){
      !isLoggedIn && setIsLoggedIn(true)
      user._id.length === 0 && getUser()
      if(router.asPath.includes('/login')){
        router.push('/')
      }
    }else if(!window.localStorage.getItem('access_token')){
     isLoggedIn && setIsLoggedIn(false)
      if(!router.asPath.includes('/login')){
        router.push('/login')
      }
    }
  }, [isLoggedIn, router, user._id.length, userDispatch])


  useEffect(() => {

  }, [router, user, userDispatch])

  const crumbs = paths.map((path, idx) => {
    return ({
      href: `/${paths.slice(0, idx + 1).join('/')}`,
      label: path.split('?')[0], isActive: paths[paths.length - 1] === path
    })
  })

  if (hideLayout) {
    return (
      <Box position='relative' sx={theme => ({
        background: theme.palette.primary.main,
      })}>
        <Head {...headProps} />
        <Box component='main' >
          {children}
        </Box>
      </Box>
    )
  } else {
    return (
      <Box position='relative' sx={theme => ({
        background: theme.palette.primary.main,
      })}>
        <Head {...headProps} />
        <AdminLayoutHeader />
        <Box position='sticky' top='77px' zIndex={200} sx={theme => ({
          background: theme.palette.primary.main,
        })}>
          <Box display='flex' maxWidth='88vw' mx='auto'
            padding='1rem' boxShadow='box-shadow: 0px 20px 20px #ffffff15' sx={{ background: '#00000052', }}>
            <CustomizedBreadcrumbs currentPath={router.asPath} crumbs={crumbs} />
          </Box>
        </Box>
        <Box component='main' >
          {children}
        </Box>
      </Box>
    )
  }

}

export default AdminLayout