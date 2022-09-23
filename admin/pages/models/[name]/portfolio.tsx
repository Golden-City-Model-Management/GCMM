
import useUser from "@/utils/pages/useLogin"
import Request from "@/utils/api/request"
import AdminLayout from "@/components/layout/Layout"
import { useRouter } from "next/router"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PortfolioImageList from '@/components/models/PortfolioImageList'
import { useState, useEffect, useContext } from "react"
import Button from '@mui/material/Button'
import { StoreContext } from "reducers/store"
import useSWR from 'swr'
import { ModelWithPolaroidsAndPortfolio } from "@/types/models"

interface Response {
  message: string,
  status: string,
  statusCode: 200,
  model: ModelWithPolaroidsAndPortfolio
}

const PortfolioPage = () => {
  useUser({redirectIfFound: false, redirectTo: 'login'})
  const router = useRouter()
  const query = router.query
  const { data } = useSWR<Response>(`${process.env.NEXT_PUBLIC_SERVER_URL}/models/${query?.name}`, 
  () => Request({path: `/models/${query?.name}`, method: 'get', }))
  const { state: { models: { model: modelInState }}} = useContext(StoreContext)
  const modelData = data?.model || modelInState
  console.log(data)

  const [isScrolling, setIsScrolling] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if(window.scrollY > 20) setIsScrolling(true)
      else setIsScrolling(false)
    })
    return () => window.removeEventListener('scroll', () => setIsScrolling(false))
  }, [])

  if (!modelData || Object.keys(modelData).length === 0) {
    return (
      <AdminLayout title='Error' description='An error has occurred!'>
        <Box display='flex' justifyContent='center' alignItems='center' minHeight='65vh'>
          <Box maxWidth='800px' textAlign='center' mx='auto'>
            <Typography lineHeight={1.3} my={3} variant='caption' component='h1'>
              An Error Occurred <br />
            </Typography>
            <Typography variant='h4' component='p'>
              Please check your internet connection and try refreshing the page.<br />
            </Typography>
          </Box>
        </Box>
      </AdminLayout>
    )
  }
  
  return (
    <AdminLayout title={`${modelData.name}'s Portfolio | GCMM`} description={`Portfolio for ${modelData.name}`} >
      <Box position='relative'>
        <Box px={{xs: 3, md: 0}} py={3} display='flex' borderColor='currentColor' 
          borderBottom='1px solid' justifyContent='space-around' 
         bgcolor={t => t.palette.primary.main} position={isScrolling ? 'fixed' : 'static'} 
        top='13%' zIndex='9999' width='100%'>
          <Typography component='h2' variant='h1' 
            textAlign='center'>Now Viewing {modelData.name}&apos;s Portfolio Images</Typography>
          <Button variant='text' color='secondary'>Add New Image</Button>
        </Box>
        <Box width='95vw' maxWidth='1150px' mx='auto'>
          {modelData.portfolio.length <= 0 ? 
          <Typography component='p' variant='h4' textAlign='center' mt={30}>No Images</Typography>
          : <PortfolioImageList images={modelData.portfolio} />}
        </Box>
      </Box>
    </AdminLayout>
  )
}

export default PortfolioPage 