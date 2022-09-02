
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
import EditModelDetails from '@/components/models/EditModelDetails'
import NextLink from 'next/link'
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

const Models = ({ model }: { model: Model & { dob: string } }) => {
  const router = useRouter()
  const query = router.query

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