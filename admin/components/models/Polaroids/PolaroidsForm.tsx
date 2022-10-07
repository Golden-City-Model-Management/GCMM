
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import React, { useState, useCallback } from 'react'
import placeholderImg from '@/public/assets/images/placeholder.jpeg'
import { Image as ImageInterface, Polaroids } from '@/types/models'

const PolaroidsForm = ({ handleSubmit, existingPolaroids }: {
  handleSubmit: (polaroids: {
    [x: string]: {
      file: File, src: string
    }
  }) => void,
  existingPolaroids?: Polaroids,
}) => {

  const [polaroids, setPolaroids] = useState({
    full_length: { src: existingPolaroids?.full_length.secure_url, file: new File([], '') },
    waist_up: { src: existingPolaroids?.waist_up.secure_url, file: new File([], '') },
    close_up: { src: existingPolaroids?.close_up.secure_url, file: new File([], '') },
    profile: { src: existingPolaroids?.profile.secure_url, file: new File([], '') },
  })
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (file) {
      setPolaroids(prev => {
        let prevObjUrl = prev[e.target.name as keyof typeof polaroids].src
       typeof prevObjUrl === 'string' && URL.revokeObjectURL(prevObjUrl)
        return { ...prev, [e.target.name]: { file, src: URL.createObjectURL(file) } }
      })
    }
  }, [])

  const submitPolaroids = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    Object.entries(polaroids).forEach(entry => {
      URL.revokeObjectURL(entry[1].src || '')
    })
    handleSubmit(polaroids as any)
  }, [handleSubmit, polaroids])

  return (
    <Box component='form' onSubmit={submitPolaroids} py={4} px={3} display='flex' flexWrap='wrap' flexDirection='column' justifyContent='center' alignItems='center'>
      <Box display='flex' flexWrap='wrap' justifyContent='space-evenly' mx='auto' my={3} gap={3}>
        {
          Object.keys(polaroids).map((key) => {
            return (
              <Box key={key} display='flex' flexDirection='column' >
                <Typography component='small' variant='h5' textTransform='capitalize' textAlign='center' borderBottom={1}
                >{key.split('_').join(' ')}</Typography>
                <Image width={230}
                  height={230}
                  alt={key} src={polaroids[key as keyof typeof polaroids].src
                    || (((existingPolaroids || polaroids)[key as keyof typeof existingPolaroids] as ImageInterface)['secure_url' || 'src'])
                    || placeholderImg.src} />
                <Button key={key} variant='outlined' size='small' color="secondary" component="label"
                  sx={{
                    margin: '8px auto', display: 'block', width: 'max-content',
                    textTransform: 'capitalize', textAlign: 'center', fontSize: '1rem'
                  }}>
                  <input type="file" name={key} value={''} onChange={handleFileInput} accept="image/*" hidden />
                  {polaroids[key as keyof typeof polaroids]?.src?.length! > 0 ? <>change</> : <>choose </>} image
                </Button>
              </Box>
            )
          })
        }
      </Box>
      <Button variant='contained' type='submit' >
        Submit
      </Button>
    </Box>
  )
}

export default PolaroidsForm