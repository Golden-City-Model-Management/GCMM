import { GetServerSideProps } from 'next'

const getUserDetails: GetServerSideProps = async (ctx) => {
  console.log( 'hhbv', ctx.req.cookies)
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