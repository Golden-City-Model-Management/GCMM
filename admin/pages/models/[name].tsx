
import { GetServerSideProps } from "next"
import { getAccessTokenFromReq, handleRedirectToLogin } from "@/utils/pages/getServerSideProps"
import Request from "@/utils/api/request"
import AdminLayout from "@/components/layout/Layout"
import { ModelsContext, Model } from "@/context/models"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import ModelForm from '@/components/models/ModelForm'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ModelDataDetails from '@/components/models/ModelData'

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
        status: response.status
      }
    }
  } else {
    return {
      props: {
        models: {},
        message: `An error occured! ${response.message}`,
        totalCount: 0,
        status: response.status
      }
    }
  }
}

const Models = ({ model }: { model: Model }) => {
  const router = useRouter()

  return (
    <AdminLayout title={`${model.name} | GCMM`} description={`An overview of ${model.name}`}>
      <Box mt={6}>
        <Typography
          fontFamily='Aboreto' maxWidth='88vw' margin='0 auto'
          fontSize={'3.5rem'} fontWeight={'100'} textTransform='capitalize'
        >{model.name}</Typography>
        <Grid width='100vw' my={0} container columns={2} columnSpacing={3}>
          <Grid minHeight='72vh' borderTop="3px solid gold" borderRight="3px solid gold" padding='35px 0 0' item xs={2} md={.8}>
            <ModelDataDetails model={model}  />
            <Box justifyContent='center' my={5} display='flex'>
              <Button color='inherit' variant='outlined'>
                Edit Details
              </Button>              
            </Box>
          </Grid>
          <Grid position="relative" item xs={2} md={1}>
            <Typography
              fontFamily='Aboreto' maxWidth='88vw' margin='0 auto'
              fontSize={'3.5rem'} fontWeight={'100'} textTransform='capitalize'
              color='secondary'
            >{model.name}</Typography>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  )
}

export default Models