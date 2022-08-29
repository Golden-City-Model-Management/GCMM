
import { GetServerSideProps } from "next"
import { getAccessTokenFromReq, handleRedirectToLogin } from "@/utils/pages/getServerSideProps"
import Request from "@/utils/api/request"
import ClientRequest from "@/utils/client/request"
import AdminLayout from "@/components/layout/Layout"
import { ModelsContext, Model } from "@/context/models"
import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, KeyboardEventHandler,
  useCallback, useContext, useEffect, useState } from "react"
import ModelsList from "@/components/models/ModelsList"
import Box from '@mui/material/Box'
import SearchBox from '@/components/common/searchbox'
import Loader from "@/components/common/loader"
import { ErrorAlert, SuccessAlert } from '@/components/common/alert'
import { TopCenteredSnackbar } from "@/components/common/snackbars"
import Typography from '@mui/material/Typography';
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

  const { models: stateModels, updateModels } = useContext(ModelsContext)
  const [modelsDisplayed, setModelsDisplayed] = useState(initialModels)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [errorDisplayTxt, setErrorDisplayTxt] = useState('')
  const [shouldFetchWithPaginate, setShouldFetchWithPaginate] = useState(true)
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
    const queryString = query?.map(el => Object.keys(el).map(key => `${key}=${el[key as keyof typeof el]}`).join('&')).join()
    try {
      let res = await ClientRequest({ path: `/models?${queryString ? queryString : ''}&fields=${fields}`, method: 'get' })
      const data = res.data
      if (data.statusCode === 200) {
        setNotification(prev => ({ ...prev, message: data.message, show: true, type: 'success' }))
        setErrorDisplayTxt('')
        return data.docs
      } else {
        setNotification(prev => ({
          ...prev, message: `${data.message}`,
          show: true, type: 'error'
        }))
      }
    } catch (err: any) {
      console.error(err)
      setNotification(prev => ({
        ...prev, message: `${err.response.data.message} Please check your internet connection!`,
        show: true, type: 'error'
      }))
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const filteredModels = useCallback((models: Model[], search: string) => models.filter(el => el.name.split(' ').some(str => str.startsWith(search)) ||
    el.name.includes(search)), [])

  const handleSearch: ChangeEventHandler<HTMLInputElement> = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value
    setSearchTerm(searchValue)
    if (searchValue.trim().length === 0) {
      return setModelsDisplayed(stateModels)
    }
    if (filteredModels(stateModels, searchValue).length > 0) {
      setModelsDisplayed(filteredModels(stateModels, searchValue))
    } else {
      setModelsDisplayed(filteredModels(stateModels, searchValue))
      setErrorDisplayTxt('Hit the enter key when done')
    }
  }, [filteredModels, stateModels])

  const handleSubmitSearch: KeyboardEventHandler<Element> = useCallback(async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim().length > 0) {
      const models = await getModels([{ 'name[gte]': searchTerm, 'name[lte]': searchTerm }])
      updateModels(models)
      setModelsDisplayed(filteredModels(models, searchTerm))
    }
  }, [filteredModels, getModels, searchTerm, updateModels])

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
      setNotification(prev => ({ ...prev, message: `${initialMessage} Tryng to get models`, show: true, type: 'error' }))
      setLoading(true)
      getModels().then(data => updateModels(data))
    } else {
      updateModels(initialModels)
      setNotification(prev => ({ ...prev, message: initialMessage, show: true, type: 'success' }))
    }
  }, [getModels, updateModels, initialStatusCode, initialMessage, initialModels])

  useEffect(() => {
    setModelsDisplayed([...stateModels])
  }, [stateModels])

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
      <SearchBox value={searchTerm} handleChange={handleSearch} handleKeyDown={handleSubmitSearch} />
      <Box m='4vh' display='flex' justifyContent='center' >
        {modelsDisplayed.length > 0 &&
          <ModelsList 
          models={modelsDisplayed} 
          handlePaginationWithScroll={handlePaginationWithScroll} 
          shouldFetchWithPaginate={shouldFetchWithPaginate} />
        }
        <Typography variant='h1' >
          {(searchTerm.trim().length > 0 && modelsDisplayed.length === 0) && <>{!errorDisplayTxt ? 'No Models match your search' : errorDisplayTxt}</>}
          {searchTerm.trim().length === 0 && (stateModels.length === 0 || modelsDisplayed.length === 0) && 'Unable to fetch models. Please try again!'}
        </Typography>
      </Box>
    </AdminLayout>
  )
}

export default Models