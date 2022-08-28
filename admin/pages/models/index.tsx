
import { GetServerSideProps } from "next"
import { getAccessTokenFromReq, handleRedirectToLogin } from "@/utils/pages/getServerSideProps"
import Request from "@/utils/api/request"
import ClientRequest from "@/utils/client/request"
import AdminLayout from "@/components/layout/Layout"
import { ModelsContext, Model } from "@/context/models"
import React, { ChangeEvent, ChangeEventHandler, useCallback, useContext, useEffect, useState } from "react"
import ModelsList from "@/components/models/ModelsList"
import Box from '@mui/material/Box'
import SearchBox from '@/components/common/searchbox'
import Loader from "@/components/common/loader"
import { ErrorAlert, SuccessAlert } from '@/components/common/alert'
import { TopCenteredSnackbar } from "@/components/common/snackbars"
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = getAccessTokenFromReq(ctx.req)
  if (!accessToken) {
    handleRedirectToLogin(ctx.res)
  }
  const fields = 'name,age,gender,cover_image,hips,waist,chest,height,shoe,id'
  const response = await Request({
    path: `/models?limit=100&page=1&fields=${fields}`, method: 'get', headers: { 'Authorization': 'Bearer ' + accessToken?.replace(/"/g, '') }
  })
  if (response.statusCode === 200) {
    return {
      props: {
        models: response.docs,
        totalCount: response.total_count,
        message: response.message,
        status: response.status,
        statusCode: response.statusCode
      }
    }
  } else {
    return {
      props: {
        models: [],
        message: 'An error occured!',
        totalCount: 0,
        status: response.status || 'failed!',
        statusCode: response.statusCode
      }
    }
  }
}

const Models = ({ models, statusCode, message, }:
  { models: Model[]; status: string; message: string; totalCount: number, statusCode: number }) => {
    
  const { models: stateModels, updateModels } = useContext(ModelsContext)
  const [modelsDisplayed, setModelsDisplayed] = useState(models)
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState<{
    type?: 'error' | 'success' | 'info',
    message: string,
    show: boolean
  }>({
    type: undefined,
    message: '',
    show: false
  })
  const [loading, setLoading] = useState(true)

  const handleSearch: ChangeEventHandler<HTMLInputElement> = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (e.target.value.length === 0) {
      return setModelsDisplayed(stateModels)
    }
    setModelsDisplayed(stateModels.filter(el => el.name.split(' ').some(str => str.startsWith(e.target.value))))
  }, [stateModels])

  const getModels = useCallback(async () => {
    let res = await ClientRequest({ path: '/models', method: 'get' })
    const data = res.data
    if(data.statusCode === 200){
      updateModels(data.models)
      setNotification(prev => ({ ...prev, message: data.message, show: true, type: 'success' }))
    }else{
      setNotification(prev => ({ ...prev, message: `${data.message} Please check your internet connection!`, show: true, type: 'error' }))
    }
    setLoading(false)
  }, [updateModels])

  useEffect(() => {
    updateModels(models)
  }, [updateModels, models])

  useEffect(() => {
    setLoading(false)
    if (statusCode !== 200) {
      setNotification(prev => ({ ...prev, message: `${message} Tryng to get models`, show: true, type: 'error' }))
      setLoading(true)
      getModels()
    }else{
      setNotification(prev => ({ ...prev, message, show: true, type: 'success' }))
    }
  }, [statusCode, models, message, getModels])
  
  return (
    <AdminLayout title={"Models | GCMM"} description={"GoldenCity Models"}>
        <Box>
        <TopCenteredSnackbar  autoHideDuration={600000}  open={notification.show} onClose={() => setNotification(x => ({...x, show: false}))}>
          <>
            {notification.type === 'error' && <ErrorAlert>{notification.message}</ErrorAlert>}
            {notification.type === 'success' && <SuccessAlert>{notification.message}</SuccessAlert>}
          </>
        </TopCenteredSnackbar>
        </Box>
      <Loader open={loading} />
      <Box maxWidth='600px' position='sticky' zIndex='20'
        top='134px' width='80vw' mx='6vw' mb='4vh'
        sx={theme => ({background: theme.palette.primary.main})}>
        <SearchBox handleChange={handleSearch} value={searchTerm} />
      </Box>
      <Box m='4vh' >
        <ModelsList models={modelsDisplayed} />
      </Box>
    </AdminLayout>
  )
}

export default Models