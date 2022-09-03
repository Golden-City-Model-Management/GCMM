
import { GetServerSideProps } from "next"
import { getAccessTokenFromReq, handleRedirectToLogin } from "@/utils/pages/getServerSideProps"
import Request from "@/utils/api/request"
import AdminLayout from "@/components/layout/Layout"
import { Model } from "@/context/models"
import { useRouter } from "next/router"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EditModelDetails from '@/components/models/EditModelDetails'
import ModelOverview from '@/components/models/ModelOverview'

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const accessToken = getAccessTokenFromReq(ctx.req)
  const headers = { 'Authorization': 'Bearer ' + accessToken?.replace(/"/g, '') }

  if (!accessToken) {
    handleRedirectToLogin(ctx.res)
  }
  const response = await Request({
    path: `/models/${ctx.query.id}?name=${ctx.query.name}`, method: 'get', headers
  })
  if (response.statusCode === 200) {
    return {
      props: {
        model: response.model,
        message: response.message,
        status: response.status || null
      }
    }
  } else {
    return {
      props: {
        model: {},
        message: `An error occured! ${response.message}`,
        status: response.statusCode || null
      }
    }
  }
}

const Models = ({ model, message, status }:
   { model: Model & { dob: string }, message: string, status: number | null }) => {
  const router = useRouter()
  const query = router.query

  if(Object.keys(model).length === 0){
    return (
      <AdminLayout title='Error'description='An error has occurred!'>
        <Box display='flex' justifyContent='center' alignItems='center' minHeight='65vh'>
          <Box maxWidth='800px' textAlign='center'  mx='auto'>
            <Typography lineHeight={1.3} my={3} variant='caption' component='h1'>
              {message} <br/> 
              The server returned a status code of {status}.
            </Typography>
            <Typography variant='h4' component='p'>
              Please check your internet connection and try refreshing the page.<br/>
            </Typography>
          </Box>
        </Box>
      </AdminLayout>
    )
  }

  if (query.editDetails) {
    return (
      <EditModelDetails model={model} />
    )
  }
  return (
    <ModelOverview model={model} />
  )
}

export default Models