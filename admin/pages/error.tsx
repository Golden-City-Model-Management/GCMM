import { Box, Button, Typography } from "@mui/material"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { useState } from "react"


const ErrorPage = () => {

  const router = useRouter()
  const [error, setError] = useState({
    error: router.query.error ? true : false,
    message: router.query.error,
    intendedPath: router.query.intendedPath,
  })
  const redirectPath = typeof router.query.intendedUrl === 'string' ?
   router.query.intendedUrl : router.query.intendedUrl[0]
   
  return (
    <Box>
      <Typography>
        {error.message}
        {
          router.query.intendedPath &&
          <NextLink href={redirectPath} passHref>
            <Button>
              Try again?
            </Button>            
          </NextLink>

        }

      </Typography>
    </Box>
  )
}

export default ErrorPage