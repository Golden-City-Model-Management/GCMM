
import { GetServerSideProps } from "next"
import { getAccessTokenFromReq, handleRedirectToLogin } from "@/utils/pages/getServerSideProps"
import Request from "@/utils/api/request"
import AdminLayout from "@/components/layout/Layout"
import { ModelsContext, Model } from "@/context/models"
import { useContext, useEffect } from "react"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const accessToken = getAccessTokenFromReq(ctx.req)

  if(!accessToken){
    handleRedirectToLogin(ctx.res)
  }
  const fields = 'name,age,gender,cover_image,hips,waist,chest,height,shoe,id'
  const response = await Request({
    path: `/models?limit=10&page=1&fields=${fields}`, method: 'get', headers: { 'Authorization': 'Bearer ' + accessToken.replace(/"/g, '') }
  })

  if(response.statusCode === 200){
    return {
      props: {
        models: response.docs,
        totalCount: response.total_count,
        message: response.message,
        status: response.status
      }
    }
  }else{
    return {
      props: {
        models: [],
        message: 'An error occured!',
        totalCount: 0,
        status: response.status
      }
    }    
  }
}

const Models = ({ models }: { models:  Model[]; status: string; message: string; totalCount: number }) => {

  const {  models: stateModels, updateModels } = useContext(ModelsContext)
  
  useEffect(() => {
    updateModels(models)
  }, [updateModels, models])
  
  return (
    <AdminLayout title={"Models"} description={"GoldenCity Models"}>
      {/* <CustomizedBreadcrumbs  /> */}
      {
        stateModels.map(model => (
          <>
          {model.name} <br/>
          {model.age} <br/>
          {model.bust || model.chest} <br/>
          {model.height} <br/>
          {model.hips} <br/>
          {model.shoe} <br/>
          {model.cover_image} <br/>
          </>
        ))
      }
    </AdminLayout>
  )
}

export default Models