import { GetServerSideProps } from 'next'
import { IncomingMessage } from 'http'
import Request from '@/utils/api/request'

const getUserDetails: GetServerSideProps = async (ctx) => {

  const accessToken = getAccessTokenFromReq(ctx.req)

  let response;

  if (!accessToken) {
    ctx.res.writeHead(302, {
      Location: '/admin/login'
    })
    ctx.res.end()
    return {
      props: {
        user: null
      }
    }
  } else {
    response = await Request({
      method: 'get',
      path: '/users/me',
      headers: { 'Authorization': 'Bearer ' + accessToken.replace(/"/g, '') }
    })
    if (response && response.statusCode === 200) {
      return {
        props: {
          user: response.user
        }
      }
    } else {
      ctx.res.writeHead(302, { Location: `/admin/error?error=${response.message}`, })
      ctx.res.end()
      return {
        props: {
          user: null
        }
      }
    }
  }
}

export default getUserDetails

export const getAccessTokenFromReq = (req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> }) => {
  req.headers = req.headers || {}
  req.headers.authorization = req.headers.authorization || ''

  const accessTokenCookie = req.cookies['access_token']
  const accessTokenFromHeader = req.headers.authorization.split(' ')[1]

  return accessTokenCookie ? accessTokenCookie : accessTokenFromHeader
}