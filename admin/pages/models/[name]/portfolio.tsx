
import { GetServerSideProps } from "next"
import { getAccessTokenFromReq, handleRedirectToLogin } from "@/utils/pages/getServerSideProps"
import Request from "@/utils/api/request"
import AdminLayout from "@/components/layout/Layout"
import { ModelWithPolaroidsAndPortfolio } from "@/types/models"
import { useRouter } from "next/router"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PortfolioImageList from '@/components/models/PortfolioImageList'
import { useState, useEffect, useContext } from "react"
import Button from '@mui/material/Button'
import { ModelContext } from "@/context/singlemodel"
import { StoreContext } from "reducers/store"

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const accessToken = getAccessTokenFromReq(ctx.req)
  if (!accessToken) {
    handleRedirectToLogin(ctx.res)
  }
  return {
    props: {}
  }
}


const PortfolioPage = () => {

  const { state: { models: { model: modelInState }}} = useContext(StoreContext)
  const router = useRouter()
  const query = router.query

  const [isScrolling, setIsScrolling] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if(window.scrollY > 20) setIsScrolling(true)
      else setIsScrolling(false)
    })
    return () => window.removeEventListener('scroll', () => setIsScrolling(false))
  }, [])

  if (!modelInState || Object.keys(modelInState).length === 0) {
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
    <AdminLayout title={`${modelInState.name}'s Portfolio | GCMM`} description={`Portfolio for ${modelInState.name}`} >
      <Box position='relative'>
        <Box px={{xs: 3, md: 0}} py={3} display='flex' borderColor='currentColor' 
          borderBottom='1px solid' justifyContent='space-around' 
         bgcolor={t => t.palette.primary.main} position={isScrolling ? 'fixed' : 'static'} 
        top='13%' zIndex='9999' width='100%'>
          <Typography component='h2' variant='h1' 
            textAlign='center'>Now Viewing {modelInState.name}&apos;s Portfolio Images</Typography>
          <Button variant='text' color='secondary'>Add New Image</Button>
        </Box>
        <Box width='95vw' maxWidth='1150px' mx='auto'>
          <PortfolioImageList images={modelInState.portfolio} />
        </Box>
      </Box>
    </AdminLayout>
  )
}

export default PortfolioPage 