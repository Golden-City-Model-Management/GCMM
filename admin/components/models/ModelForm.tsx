
import { useState, useCallback } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {Model} from '@/context/models' 
import InputAdornment from '@mui/material/InputAdornment'

const ModelForm = ({ model, submitBtnTxt, handleSubmit }: {
  model: Model,
  submitBtnTxt: string,
  handleSubmit: (data: Model) => void
}) => {
  const excludedFields = [
    'cover_image',
    'portfolio',
    'polaroids',
    'extra_polaroids',
    'socials', 'age',
    'id', 'isActive',]
  const keysOfNonNestedFields = Object.keys(model).filter(key => !excludedFields.includes(key) )
  let initialState = keysOfNonNestedFields.map(key => ({ [key]: model[key as keyof typeof model] }))
  const [formData, setFormData] = useState<Model>(() => {
    let data = {}
    initialState.forEach(keyVal => {
      data = { ...data, ...keyVal }
    })
    return data as Model
  })
  const [error, setError] = useState<{ [name: string]: boolean }>({})

  const handleFormDataChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if(error[e.target.name as keyof typeof error]){
      setError(prev => ({...prev, [e.target.name]: false}))
    }
    setFormData(prev => {
      return { ...prev, [e.target.name]: e.target.type === 'number' ? +(e.target.value) : e.target.value }
    })
  }, [error])

  const retrieveValuesAndSubmit: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault()
    const hasEmptyFields = keysOfNonNestedFields.map(key => {
      const data = formData[key as keyof Model]
      if(data === 0 || data === undefined){
        setError(prev => ({...prev, [key]: true}))
        return true
      }else return false
    })
    if(hasEmptyFields.some(el => el)){
      return
    }else handleSubmit(formData)
  }, [keysOfNonNestedFields, handleSubmit, formData])

  return (
    <Box onSubmit={retrieveValuesAndSubmit} flexDirection='column'
      component='form' mx='auto' width='80vw' maxWidth='900px' gap={5}
      display='flex' justifyContent='center' alignItems='center'>
      <Grid container columns={3} columnSpacing={3} rowSpacing={3} component='legend'>
        {keysOfNonNestedFields.sort((a, b) => {
          const isA = typeof model[a as keyof typeof formData] === 'number' ? 1 : 0
          const isB = typeof model[b as keyof typeof formData] === 'number' ? 1 : 0
          return isA - isB
        }).map(field => (
          <Grid key={field} item xs={3} sm={1.5} md={1}>
            <TextField aria-labelledby={field} required aria-label={field} 
              error={error[field]} color={'secondary'}
              name={field} onChange={handleFormDataChange} label={field} hiddenLabel
              InputLabelProps={{ shrink: true }} fullWidth variant='outlined'
              InputProps={{
                startAdornment: typeof model[field as keyof typeof formData] === 'number' ?
                 <InputAdornment position="start">cm</InputAdornment> : ''
              }}
              type={
                typeof model[field as keyof typeof formData] === 'object' ? 'date' : 
                typeof model[field as keyof typeof formData]}
              value={formData[field as keyof typeof formData]?.toString()}
              sx={t => ({
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: t.palette.text.primary
                }})} 
                />
          </Grid>
        ))}
      </Grid>
      <Button variant='outlined' color='inherit' type='submit'>{submitBtnTxt}</Button>
    </Box>
  )
}

export default ModelForm
