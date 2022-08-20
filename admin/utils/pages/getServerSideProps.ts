import { GetServerSideProps } from 'next'

const getUserDetails: GetServerSideProps = async (ctx) => {

  const accessToken = ctx.req.cookies['access_token']
  if(!ctx.resolvedUrl.includes('/login') && !accessToken) {
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