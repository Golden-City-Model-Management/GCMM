
import { GetServerSideProps } from "next"
import { getAccessTokenFromReq, handleRedirectToLogin } from "@/utils/pages/getServerSideProps"
import Request from "@/utils/api/request"
import AdminLayout from "@/components/layout/Layout"
import { ModelsContext, Model } from "@/context/models"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const accessToken = getAccessTokenFromReq(ctx.req)

  if(!accessToken){
    handleRedirectToLogin(ctx.res)
  }
  console.log(ctx.query)

  const headers = { 'Authorization': 'Bearer ' + accessToken.replace(/"/g, '') }

  const modelPromise = Request({
    path: `/models/${ctx.query.id}?name=${ctx.query.name}`, method: 'get', headers
  })

  const portfolioPromise = Request({
    path: `/portfolio/${ctx.query.id}?name=${ctx.query.name}`, 
    method: 'get', 
    headers, 
  })

  const [modelRes, portfolioRes] = await Promise.all([modelPromise, portfolioPromise])

  console.log(modelRes, portfolioRes)
  if(modelRes.statusCode === 200){
    return {
      props: {
        // models: response.docs,
        // totalCount: response.total_count,
        // message: response.message,
        // status: response.status
      }
    }
  }else{
    return {
      props: {
        // models: [],
        // message: 'An error occured!',
        // totalCount: 0,
        // status: response.status
      }
    }    
  }
}

const Models = ({ model }: { model:  Model }) => {

  const router = useRouter()
  const {  models: stateModels, updateModels } = useContext(ModelsContext)
  console.log(model)
  console.log(router.query)

  return (
    <AdminLayout title={"Models"} description={"GoldenCity Models"}>
      {
        stateModels.map(model => (
          <>
          {/* {model.name} <br/>
          {model.age} <br/>
          {model.bust || model.chest} <br/>
          {model.height} <br/>
          {model.hips} <br/>
          {model.shoe} <br/>
          {model.cover_image} <br/> */}
          </>
        ))
      }
    </AdminLayout>
  )
}

export default Models