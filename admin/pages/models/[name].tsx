
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
import PolaroidsList from '@/components/models/PolaroidsList'
import EditModelForm from '@/components/models/EditModelData'
import NextLink from 'next/link'

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
  const query = router.query

  if (router.query.editDetails) {
    return (
      <Box display='flex' minHeight='100vh' justifyContent='center' alignItems='center' >
        <Box onClick={() => router.back()} position='fixed' top='5%' left='2%' >
          <Button variant='text' color='inherit'>&larr;&nbsp;Back</Button>
        </Box>
        <Box borderRadius='12px' bgcolor='primary.light' px={8} py={16} >
        <EditModelForm model={model} />
        </Box>
      </Box>
    )
  }
  return (
    <AdminLayout title={`${model.name} | GCMM`} description={`An overview of ${model.name}`}>
      <Box mt={6}>
        <Typography
          fontFamily='Aboreto' maxWidth='88vw' margin='0 auto' component='h1'
          fontSize={'3.5rem'} fontWeight={'100'} textTransform='capitalize'
        >{model.name}</Typography>
        <Grid width='100vw' my={0} minHeight='72vh' container columns={2} columnSpacing={3}>

          <Grid item borderTop="3px solid" borderRight="3px solid"
            borderColor={t => t.palette.secondary.main} padding='35px 0 ' xs={2} md={.8}>
            <ModelDataDetails model={model} />
            <Box justifyContent='center' mt={5} display='flex'>
              <NextLink passHref 
              href={`/models/${model.name}?id=${model.id}&editDetails=true`} as={`/models/${model.name}?editDetails=true`}>
              <Button color='inherit' variant='outlined'>
                Edit Details
              </Button>
              </NextLink>
            </Box>
          </Grid>

          <Grid item position="relative" justifyContent='center'
            xs={2} md={1.1} mx={'auto'} my={{ xs: 8, md: 0 }} pb='35px'>
            <Typography
              fontFamily='Aboreto' maxWidth='88vw' margin='0 auto' component='h2'
              fontSize={'1.8rem'} fontWeight={'100'} textTransform='capitalize'
            >Polaroids and Portfolio</Typography>
            <PolaroidsList />
            <Box display='flex' justifyContent='space-around' alignItems='center' mt={5}  >
              <Button color='inherit' variant='outlined'>
                Manage Polaroids
              </Button>
              <Button color='inherit' variant='outlined'>
                Manage Portfolio
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </AdminLayout>
  )
}

export default Models