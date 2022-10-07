
import { GetStaticPaths, GetStaticProps } from "next"
import Request from "@/utils/api/request"
import AdminLayout from "@/components/layout/Layout"
import { ModelWithPolaroidsAndPortfolio } from "@/types/models"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EditModelDetails from '@/components/models/EditModelDetails'
import ModelOverview from '@/components/models/ModelOverview'
import PolaroidsOverview from "@/components/models/Polaroids/AllPolaroidsOverview"
import { useContext, useEffect, useState, useCallback } from "react"
import { modelsReducer, StoreContext } from "reducers/store"

export const getStaticPaths: GetStaticPaths = async () => {
  const fields = 'name,id'
  const limit = 100
  try{
    const response = await Request({
      path: `/models?limit=${limit}&page=1&fields=${fields}`, method: 'get' 
    })
    const paths = response.docs.map((model: { name: string }) => {
      return { params: { name: model.name.toString()}}
    })
    return {
      paths: paths,
      fallback: 'blocking'
    }
  }catch(err){
    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const modelName = ctx.params?.name
  try{
    const response = await Request({
      path: `/models/${modelName}`, method: 'get'
    })
    return {
      props: {
          model: response.model || {},
          message: response.message || '',
          status: response.status || '',
          statusCode: response.statusCode || 0,
      },
    }
  }catch(err){
    return {
      props: {
        model: {}, message: 'An Error occured', status: 'failed', statusCode: 500 
      },
      fallback: true
    }
  }
}

const Models = ( props :
   { model: ModelWithPolaroidsAndPortfolio[], message: string, status: string | null, statusCode: number  }) => {
  const { state: { models: { model: modelInState }}, combinedDispatch } = useContext(StoreContext)
  const [isEditDetails, setIsEditDetails] = useState(false)
  const [isPolaroidsOverview, setIsPolaroidsOverview] = useState(false)
  const model = props.model, 
  message = props.message,
  status = props.status,
  statusCode = props.statusCode

  const toggleEditDetails = useCallback((newState?: boolean) => {
    setIsEditDetails(prev => newState !== undefined ? newState : !prev)
  }, [])

  const togglePolaroidsOverview = useCallback((newState?: boolean) => {
    setIsPolaroidsOverview(prev => newState !== undefined ? newState : !prev)
  }, [])

  console.log(model, props)
  useEffect(() => {
    combinedDispatch.modelsDispatch({type: modelsReducer.modelsActions.updateSingleModel, payload: model})
  }, [combinedDispatch, model]) 
  
  if(!model){
    return (
      <AdminLayout title='Error'description='An error has occurred!'>
        <Box display='flex' justifyContent='center' alignItems='center' minHeight='65vh'>
          <Box maxWidth='800px' textAlign='center'  mx='auto'>
            <Typography lineHeight={1.3} my={3} variant='caption' component='h1'>
              {status}! <br/> 
            </Typography>
            <Typography lineHeight={1.3} my={3} variant='h2' component='p'>
              {message} <br/> 
              The server returned a status code of {statusCode}.
            </Typography>
           { !message && 
           <Typography variant='h4' component='p'>
              Please check your internet connection and try refreshing the page.<br/>
            </Typography>}
          </Box>
        </Box>
      </AdminLayout>
    )
  }

  if (isEditDetails) {
    return (
      <AdminLayout title={`${modelInState.name} | Edit details and statistics`} description={`View and edit ${modelInState.name}'s Polaroids`} 
      hideLayout={true}>
        <EditModelDetails toggleEditDetails={toggleEditDetails} />
      </AdminLayout>
    )
  }
  if(isPolaroidsOverview){
    return (
      <AdminLayout title={`${modelInState.name} | Polaroids`} description={`Edit ${modelInState.name}'s details and statistics`} 
      hideLayout={true}>
        <PolaroidsOverview togglePolaroidsOverview={togglePolaroidsOverview} model={modelInState} />
      </AdminLayout>
    )
  }
  return (
    <ModelOverview 
      model={modelInState} 
      togglePolaroidsOverview={togglePolaroidsOverview}
      toggleEditDetails={toggleEditDetails}  />
  )
}

export default Models