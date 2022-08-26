import { Box, Button, Typography } from "@mui/material"
import { useRouter } from "next/router"

const ErrorPage = () => {

  const router = useRouter()
  const errorMessage = typeof router.query.error !== undefined && typeof router.query.error === 'string' ? router.query.error : ""
   
  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' minHeight='100vh'>
      <Box 
      maxWidth='600px' width='80vw'
      display='flex' flexDirection='column' justifyContent='center' padding='10px 20px'
      alignItems='center' minHeight='50vh'  borderRadius='15px' gap='25px'
       sx={{background: '#fff'}}>
      <Typography textAlign='center' variant='h1' color='primary' component='h1'>
        {errorMessage.replace(/"/g, '')}
      </Typography>
        <Button variant='contained' onClick={() => router.push('/', undefined, {shallow: false})} color={'primary'}>
          Try again?
        </Button>            
      </Box>
    </Box>
  )
}

export default ErrorPage