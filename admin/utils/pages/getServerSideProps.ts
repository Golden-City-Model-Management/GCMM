import { GetServerSideProps } from 'next'

const getUserDetails: GetServerSideProps = async (ctx) => {

  ctx.req.headers = ctx.req.headers || {

  }
  ctx.req.headers.authorization = ctx.req.headers.authorization || ''

  const accessTokenCookie = ctx.req.cookies['access_token']
  const accessTokenFromHeader = ctx.req.headers.authorization.split(' ')[1]
  if(!ctx.resolvedUrl.includes('/login') && (!accessTokenCookie || !accessTokenFromHeader)) {
    ctx.res.writeHead(302, {
      Location: '/admin/login'
    })
    ctx.res.end()
  }

  return {
    props: {
      user: {
        name: 'Hhello world ',
        age: 'halelluja'
      }
    }
  }
}

export default getUserDetails 