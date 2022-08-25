import { GetServerSideProps } from 'next'
import Request from '@/utils/api/request'

const getUserDetails: GetServerSideProps = async (ctx) => {

  ctx.req.headers = ctx.req.headers || {}

  ctx.req.headers.authorization = ctx.req.headers.authorization || ''

  const accessTokenCookie = ctx.req.cookies['access_token']
  const accessTokenFromHeader = ctx.req.headers.authorization.split(' ')[1]
  const accessToken = accessTokenCookie || accessTokenFromHeader

  if(!ctx.resolvedUrl.includes('/login')) {
    if(!accessToken) {
    ctx.res.writeHead(302, {
      Location: '/admin/login'
    })
    ctx.res.end()
   }
  }else {
    if(accessToken){
      ctx.res.writeHead(302, {
        location: '/admin'
      })  
      ctx.res.end()
    }
  }

  const response = await Request({
    method: 'get',
    path: '/users/me',
    headers: {
      'Authorization': 'Bearer ' + accessToken?.replace(/"/g, '')
    }
  })
  if(response.statusCode === 200){
    return {
      props: {
        user: response.user
      }
    }    
  }
  return {
    props: {
      user: {}
    }
  }
}

export default getUserDetails 