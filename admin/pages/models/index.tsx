
import { GetServerSideProps } from "next"
import { getAccessTokenFromReq, handleRedirectToLogin } from "@/utils/pages/getServerSideProps"
import Request from "@/utils/api/request"
import AdminLayout from "@/components/layout/Layout"
import { ModelsContext, Model } from "@/context/models"
import React, {
  useCallback, useContext, useEffect, useState
} from "react"
import ModelSearchProvider from '@/context/model.search'
import ModelsList from "@/components/models/ModelsList"
import Box from '@mui/material/Box'
import Loader from "@/components/common/loader"
import { ErrorAlert, SuccessAlert } from '@/components/common/alert'
import { TopCenteredSnackbar } from "@/components/common/snackbars"
import NotFound from '@/components/models/NotFound';
import ModelsListSearchBar from '@/components/models/Search'

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

  const { models: stateModels, updateModels, getModels,
    notification, modelsDisplayed,
    updateModelsDisplayed, loading, setLoading, updateNotification } = useContext(ModelsContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [shouldFetchWithPaginate, setShouldFetchWithPaginate] = useState(true)

  const handlePaginationWithScroll = useCallback(async () => {
    let models
    models = await getModels([{ 'limit': `${limit}`, 'page': (currentPage + 1).toString() }])
    if (models) {
      updateModels(models)
      setCurrentPage(prev => prev + 1)
      if (models.length < limit) {
        setShouldFetchWithPaginate(false)
      }
    }
  }, [currentPage, getModels, updateModels])

  useEffect(() => {
    setLoading(false)
    if (initialStatusCode !== 200) {
      updateNotification({ message: `${initialMessage} Tryng to get models`, show: true, type: 'error' })
      setLoading(true)
      getModels().then(data => updateModels(data))
    } else {
      updateModels(initialModels)
      updateNotification({ message: initialMessage, show: true, type: 'success' })
    }
  }, [getModels, updateModels, initialStatusCode, initialMessage, initialModels, setLoading, updateNotification])

  useEffect(() => {
    updateModelsDisplayed([...stateModels])
  }, [stateModels, updateModelsDisplayed])

  return (
    <AdminLayout title={"Models | GCMM"} description={"GoldenCity Models"}>
      <ModelSearchProvider>
        <Box>
          <TopCenteredSnackbar autoHideDuration={6000} open={notification.show} onClose={() => updateNotification({ show: false })}>
            <>
              {notification.type === 'error' && <ErrorAlert>{notification.message}</ErrorAlert>}
              {notification.type === 'success' && <SuccessAlert>{notification.message}</SuccessAlert>}
            </>    
          </TopCenteredSnackbar>
        </Box>  
        <Loader open={loading} />
        <ModelsListSearchBar />
        <Box data-testid='models-list' m='4vh' display='flex' justifyContent='center' >
          {modelsDisplayed.length > 0 &&
            <ModelsList
              models={modelsDisplayed}
              handlePaginationWithScroll={handlePaginationWithScroll}
              shouldFetchWithPaginate={shouldFetchWithPaginate} />
           }
          <NotFound />
        </Box>
      </ModelSearchProvider> 
    </AdminLayout>
  )
}

export default Models