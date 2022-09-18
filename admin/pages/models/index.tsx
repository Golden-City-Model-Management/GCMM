
import { GetServerSideProps } from "next"
import { getAccessTokenFromReq, handleRedirectToLogin } from "@/utils/pages/getServerSideProps"
import Request from "@/utils/api/request"
import AdminLayout from "@/components/layout/Layout"
import { Model } from '@/types/models'
import React, {
  useCallback, useContext, useEffect, useState
} from "react"
import ModelSearchProvider from '@/context/model.search'
import ModelsList from "@/components/models/ModelsList"
import Box from '@mui/material/Box'
import Loader from "@/components/common/loader"
import NotFound from '@/components/models/NotFound';
import ModelsListSearchBar from '@/components/models/Search'
import{ StoreContext, modelsReducer, notificationReducer } from '../../reducers/store'

const fields = 'name,age,gender,cover_image,hips,waist,chest,height,shoe,id'
const limit = 5
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = getAccessTokenFromReq(ctx.req)
  if (!accessToken) {
    handleRedirectToLogin(ctx.res)
  }
  const response = await Request({
    path: `/models?limit=${limit}&page=1&fields=${fields}`, method: 'get', headers: { 'Authorization': 'Bearer ' + accessToken?.replace(/"/g, '') }
  })
  if (response.statusCode === 200) {
    return {
      props: {
        initialModels: response.docs,
        initialTotalCount: response.total_count,
        initialMessage: response.message,
        initialStatus: response.status,
        initialStatusCode: response.statusCode
      }
    }
  } else {
    return {
      props: {
        initialModels: [],
        initialMessage: 'An error occured!',
        initialTotalCount: 0,
        initialStatus: response.status || 'failed!',
        initialStatusCode: response.statusCode
      }
    }
  }
}

const Models = ({ initialModels, initialStatusCode, initialMessage, }:
  { initialModels: Model[]; initialStatus: string; initialMessage: string; initailTotalCount: number, initialStatusCode: number }) => {

  const { state, combinedDispatch} = useContext(StoreContext)
  const { models: { models, loading, searchTerm }} = state
  const { modelsActions, fetchModels,  } = modelsReducer
  const { notificationActions } = notificationReducer

  const [filteredModels, setFilteredModels] = useState(models)
  const [currentPage, setCurrentPage] = useState(1)
  const [shouldFetchWithPaginate, setShouldFetchWithPaginate] = useState(true)

  const handlePaginationWithScroll = useCallback(async () => {
    const  data = await fetchModels([{ 'limit': `${limit}`, 'page': (currentPage + 1).toString() }])
    console.log(data)
    if (!data.error) {
      combinedDispatch.modelsDispatch({ type: modelsActions.updateModels, payload: data.docs})
      setCurrentPage(prev => prev + 1)
      if (data.docs.length < limit) {
        setShouldFetchWithPaginate(false)
      }
    }
  }, [combinedDispatch, currentPage, fetchModels, modelsActions.updateModels])

  useEffect(() => {
    combinedDispatch.modelsDispatch({ type: modelsActions.updateLoading, payload: false})
    if (initialStatusCode !== 200 && models.length <= 0) {
      combinedDispatch.modelsDispatch({ type: modelsActions.updateLoading, payload: true})
      fetchModels().then(({message, docs, statusCode}) => {
      const notifType = statusCode === 200 ? 'success' : 'error'
      combinedDispatch.modelsDispatch({ type: modelsActions.updateModels, payload: docs})
      combinedDispatch.notificationDispatch({type: notificationActions.showNotification, 
        payload: { message, show: true, type: notifType }})
      })
    combinedDispatch.modelsDispatch({ type: modelsActions.updateLoading, payload: false})
    }
  }, [combinedDispatch, fetchModels, initialMessage, initialStatusCode, 
    models.length, modelsActions, notificationActions.showNotification])

  useEffect(() => {
    state.models.models.length <= 0 && combinedDispatch.modelsDispatch({ type: modelsActions.updateModels, payload: initialModels})
    combinedDispatch.notificationDispatch({type: notificationActions.showNotification, payload: { message: initialMessage, show: true, type: 'success' }})
  }, [initialMessage, combinedDispatch, modelsActions.updateModels, initialModels, state.models.models.length, notificationActions.showNotification])

  useEffect(() => {
    if(searchTerm.trim().length > 0){
      setFilteredModels(models.filter(el => el.name.split(' ').some(str => str.startsWith(searchTerm)) || el.name.includes(searchTerm)))
    }else{
      setFilteredModels(models)
    }
  }, [models, searchTerm])

  return (
    <AdminLayout title={"Models | GCMM"} description={"GoldenCity Models"}>
      <ModelSearchProvider>
        <Loader open={loading} />
        <ModelsListSearchBar />
        <Box data-testid='models-list' m='4vh' display='flex' justifyContent='center' >
          {filteredModels.length > 0 &&
            <ModelsList
              models={filteredModels}
              handlePaginationWithScroll={handlePaginationWithScroll}
              shouldFetchWithPaginate={shouldFetchWithPaginate} />
           }
          <NotFound searchTerm={searchTerm} models={models} initialStatusCode={initialStatusCode} />
        </Box>
      </ModelSearchProvider> 
    </AdminLayout>
  )
}

export default Models