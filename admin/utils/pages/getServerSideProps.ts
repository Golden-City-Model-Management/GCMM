import { GetServerSideProps } from 'next'
import Request from '@/utils/api/request'
import cookie from 'cookie'

const getUserDetails: GetServerSideProps = async (ctx) => {

  ctx.req.headers = ctx.req.headers || {}

  ctx.req.headers.authorization = ctx.req.headers.authorization || ''

  const accessTokenCookie = ctx.req.cookies['access_token']
  const accessTokenFromHeader = ctx.req.headers.authorization.split(' ')[1]
  const accessToken = accessTokenCookie || accessTokenFromHeader

  let response

  if(!accessToken){
    if(!ctx.resolvedUrl.includes('login')){
      ctx.res.writeHead(302, {
        Location: '/admin/login'
      })
      ctx.res.end()
    }else {
      return { 
        props: {}
      }
    }
  }else{
    if(ctx.resolvedUrl.includes('login')){
      ctx.res.writeHead(302, {
        location: '/admin'
      })  
     ctx.res.end()
    }
    response = await Request({
      method: 'get',
      path: '/users/me',
      headers: {
        'Authorization': 'Bearer ' + accessToken?.replace(/"/g, '')
      }
    })
  } 
   if(response && response.statusCode !== 200){
      ctx.res.setHeader( "Set-Cookie", [`access_token=deleted; Max-Age=0`,]);
      ctx.res.writeHead(302, { Location: '/admin/login?error="Authentication failed.Please login again!"',})
      ctx.res.end()
    }
    return {
      props: {
        user: response.user
      }
    }
}

export default getUserDetails 