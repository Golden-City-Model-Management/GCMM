
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React, { useState, useCallback } from 'react'

const PolaroidsForm = ({ handleSubmit }: {
  handleSubmit: (polaroids: any) => void
}) => {

  const [polaroids, setPolaroids] = useState({
    full_length: '',
    waist_up: '',
    profile: '',
    close_up: '',
  })
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if(file){
      setPolaroids(prev => ({...prev, [e.target.name]: file}))
    }
  }, [])

  const submitPolaroids = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(polaroids)
  }, [handleSubmit, polaroids])
  
  return (
    <Box component='form' onSubmit={submitPolaroids} display='flex' flexWrap='wrap' justifyContent='space-around'>
      {
        Object.keys(polaroids).map((key) => {
          return (
            <Button  key={key} color="secondary" component="label" 
            sx={{ margin: '0 auto', display: 'block', width: {md: '50%'}, textTransform: 'capitalize', textAlign: 'center' }}>
              <input type="file" name={key} value={''} onChange={handleFileInput} accept="image/*" hidden />
              Choose {key} image
            </Button>
          )
        })
      }
    </Box>
  )
}

export default PolaroidsForm