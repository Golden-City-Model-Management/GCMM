
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import React, { useState, useCallback } from 'react'
import placeholderImg from '@/public/assets/images/placeholder.jpeg'

const PolaroidsForm = ({ handleSubmit }: {
  handleSubmit: (polaroids: any) => void
}) => {

  const [polaroids, setPolaroids] = useState({
    full_length: {src: '', file: new Blob()},
    waist_up: {src: '', file: new Blob()},
    profile: {src: '', file: new Blob()},
    close_up: {src: '', file: new Blob()},
  })
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if(file){
      setPolaroids(prev => {
        URL.revokeObjectURL(prev[e.target.name as keyof typeof polaroids].src)
        return {...prev, [e.target.name]: {file, src: URL.createObjectURL(file)}}
      })
    }
  }, [])

  const submitPolaroids = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    Object.entries(polaroids).forEach(entry => {
      URL.revokeObjectURL(entry[1].src)
    })
    handleSubmit(polaroids)
  }, [handleSubmit, polaroids])
  
  return (
    <Box component='form' onSubmit={submitPolaroids} border={1} py={4} px={3} display='flex' flexWrap='wrap' flexDirection='column' justifyContent='center' alignItems='center'>
      <Box display='flex' flexWrap='wrap' justifyContent='center' my={3} >
        {
          Object.keys(polaroids).map((key) => {
            return (
              <Box key={key} display='flex' flexDirection='column' border={1} >
                <Button key={key}  variant='text' size='small' color="secondary" component="label" 
                sx={{ margin: '0 auto', display: 'block', width: 'max-content', 
                textTransform: 'capitalize', textAlign: 'center', fontSize: '1rem'}}>
                  <input type="file" name={key} value={''} onChange={handleFileInput} accept="image/*" hidden />
                  {polaroids[key as keyof typeof polaroids].src.length > 0 ? <>change</> : <>choose </>} image
                </Button>
                <Image width={300} 
                  height={300} 
                  alt='' src={polaroids[key as keyof typeof polaroids].src || placeholderImg.src} />
                <Typography component='small' textAlign='center'>{key}</Typography>
              </Box>
            )
          })
        }        
      </Box>
      <Button type='submit' color='inherit'>
        Submit
      </Button>
    </Box>
  )
}

export default PolaroidsForm