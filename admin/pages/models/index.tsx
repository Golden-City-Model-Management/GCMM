
import { GetServerSideProps } from "next"
import { getAccessTokenFromReq, handleRedirectToLogin } from "@/utils/pages/getServerSideProps"
import Request from "@/utils/api/request"
import ClientRequest from "@/utils/client/request"
import AdminLayout from "@/components/layout/Layout"
import { ModelsContext, Model } from "@/context/models"
import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, KeyboardEventHandler, useCallback, useContext, useEffect, useState } from "react"
import ModelsList from "@/components/models/ModelsList"
import Box from '@mui/material/Box'
import SearchBox from '@/components/common/searchbox'
import Loader from "@/components/common/loader"
import { ErrorAlert, SuccessAlert } from '@/components/common/alert'
import { TopCenteredSnackbar } from "@/components/common/snackbars"
import Typography from '@mui/material/Typography';

const fields = 'name,age,gender,cover_image,hips,waist,chest,height,shoe,id'
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = getAccessTokenFromReq(ctx.req)
  if (!accessToken) {
    handleRedirectToLogin(ctx.res)
  }
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
  const [errorDisplayTxt, setErrorDisplayTxt] = useState('')
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

  const getModels = useCallback(async (query?: 
    {
      [key: string]: string
    }[]) => {
    const queryString =  query?.map(el => Object.keys(el).map(key => `${key}=${el[key as keyof typeof el]}`).join('&')).join()
    try {
     let  res = await ClientRequest({ path: `/models?${queryString}&fields=${fields}`.replace('%20', ' '), method: 'get' })
      const data = res.data
      if (data.statusCode === 200) {
        updateModels(data.docs)
        setNotification(prev => ({ ...prev, message: data.message, show: true, type: 'success' }))
        setErrorDisplayTxt('')
        return data.docs
      } else {
        setNotification(prev => ({
          ...prev, message: `${data.message} Please check your internet connection!`,
          show: true, type: 'error'
        }))
      }
    } catch (err) {
      console.error(err)
      return []
    } finally {
      setLoading(false)
    }
  }, [updateModels])
  
  const filteredModels = useCallback((models: Model[], search: string) => models.filter(el => el.name.split(' ').some(str => str.startsWith(search)) || 
  el.name.includes(search)), [])

  const handleSearch: ChangeEventHandler<HTMLInputElement> = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value
    setSearchTerm(searchValue)
    if (searchValue.length === 0) {
      return setModelsDisplayed(stateModels)
    }
    if (filteredModels(stateModels, searchValue).length > 0) {
      setModelsDisplayed(filteredModels(stateModels, searchValue))
    } else {
      setModelsDisplayed(filteredModels(stateModels, searchValue))
      setErrorDisplayTxt('Hit the enter key when done')
    }
  }, [filteredModels, stateModels])

  const handleSubmitSearch: KeyboardEventHandler<Element> = useCallback( async (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      const models = await getModels([{'name[gte]':searchTerm, 'name[lte]': searchTerm}])
      setModelsDisplayed(filteredModels(models, searchTerm))    }
  }, [filteredModels, getModels, searchTerm]) 

  useEffect(() => {
    updateModels(models)
  }, [updateModels, models])

  useEffect(() => {
    setLoading(false)
    if (statusCode !== 200) {
      setNotification(prev => ({ ...prev, message: `${message} Tryng to get models`, show: true, type: 'error' }))
      setLoading(true)
      getModels()
    } else {
      setNotification(prev => ({ ...prev, message, show: true, type: 'success' }))
    }
  }, [statusCode, models, message, getModels])

  return (
    <AdminLayout title={"Models | GCMM"} description={"GoldenCity Models"}>
      <Box>
        <TopCenteredSnackbar autoHideDuration={6000} open={notification.show} onClose={() => setNotification(x => ({ ...x, show: false }))}>
          <>
            {notification.type === 'error' && <ErrorAlert>{notification.message}</ErrorAlert>}
            {notification.type === 'success' && <SuccessAlert>{notification.message}</SuccessAlert>}
          </>
        </TopCenteredSnackbar>
      </Box>
      <Loader open={loading} />
      <Box maxWidth='600px' position='sticky' zIndex='20'
        top='134px' width='80vw' mx='6vw' mb='4vh'
        sx={theme => ({ background: theme.palette.primary.main })}>
        <SearchBox placeholder="Search By Name" handleChange={handleSearch} value={searchTerm} handleKeyDown={handleSubmitSearch} />
      </Box>
      <Box m='4vh' display='flex' justifyContent='center' >
        {modelsDisplayed.length > 0 && <ModelsList models={modelsDisplayed} />}
        <Typography variant='h1' >
          {(searchTerm.trim().length > 0 && modelsDisplayed.length === 0) && <>{!errorDisplayTxt ? 'No Models match your search' : errorDisplayTxt}</>}
          {searchTerm.trim().length === 0 && (stateModels.length === 0 || modelsDisplayed.length === 0 )&& 'Unable to fetch models. Please try again!'}
        </Typography>
      </Box>
    </AdminLayout>
  )
}

export default Models