
import { useState, useCallback, useMemo } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { ModelWithPolaroidsAndPortfolio, Model } from '@/types/models'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

export const nonDisplayedFields = [
  'cover_image',
  'portfolio',
  'polaroids',
  'extra_polaroids',
  'socials', 'gender', 'dob', 'age',
  'id', 'isActive', 'name']

const ModelForm = ({ model, submitBtnTxt, handleSubmit }: {
  model: ModelWithPolaroidsAndPortfolio | Model,
  submitBtnTxt: string,
  handleSubmit: (data: Model) => void
}) => {

  const keysOfNonNestedFields = Object.keys(model)
    .filter(key => key === 'name' || key === 'dob' || key === 'gender' || !nonDisplayedFields.includes(key))

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
    if (error[e.target.name as keyof typeof error]) {
      setError(prev => ({ ...prev, [e.target.name]: false }))
    }
    setFormData(prev => {
      return {
        ...prev, [e.target.name]: e.target.type === 'number' ?
          +e.target.value >= 0 ? +(e.target.value) : 0 :
          e.target.value
      }
    })
  }, [error])

  const retrieveValuesAndSubmit: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault()
    const hasEmptyFields = keysOfNonNestedFields.map(key => {
      const data = formData[key as keyof Model]
      if (data === 0 || data === undefined) {
        setError(prev => ({ ...prev, [key]: true }))
        return true
      } else return false
    })
    if (hasEmptyFields.some(el => el)) {
      return
    } else {
      handleSubmit(formData)
      setFormData(() => {
        let data = {}
        initialState.forEach(keyVal => {
          data = { ...data, ...keyVal }
        })
        return data as Model
      })
    }
  }, [keysOfNonNestedFields, formData, handleSubmit, initialState])

  const keysSorted = useMemo(() => keysOfNonNestedFields.sort((a, b) => {
    const isA = typeof model[a as keyof typeof formData] === 'number' ? 1 : 0
    const isB = typeof model[b as keyof typeof formData] === 'number' ? 1 : 0
    return isA - isB
  }), [keysOfNonNestedFields, model])

  return (
    <Box onSubmit={retrieveValuesAndSubmit} flexDirection='column'
      component='form' mx='auto' width='80vw' maxWidth='900px' gap={5}
      display='flex' justifyContent='center' alignItems='center'>
      <Grid container columns={3} columnSpacing={3} rowSpacing={3} component='legend'>
        {keysSorted.map((field: string) => (
          <Grid key={field} item xs={3} sm={1.5} md={1}>
            {field !== 'gender' ?
              <TextField aria-labelledby={field === 'bust' && formData.gender === 'male' ? 'chest' : field}
               required aria-label={field === 'bust' && formData.gender === 'male' ? 'chest' : field}
                error={error[field]} color={'secondary'}
                name={field} onChange={handleFormDataChange} 
                label={field === 'bust' && formData.gender === 'male' ? 'chest' : field} 
                hiddenLabel InputLabelProps={{ shrink: true }} fullWidth variant='outlined'
                InputProps={{
                  startAdornment: typeof model[field as keyof typeof formData] === 'number' ?
                    <InputAdornment position="start">cm</InputAdornment> : ''
                }}
                type={
                  field === 'dob' ? 'date' :
                    typeof model[field as keyof typeof formData]}
                value={formData[field as keyof typeof formData]?.toString()}
                sx={t => ({
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: t.palette.text.primary
                  }
                })}
              /> :
              <>
                <FormControl fullWidth required sx={t => ({
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: t.palette.text.primary
                  }
                })}>
                  <InputLabel color={'secondary'} id="gender">gender</InputLabel>
                  <Select
                    labelId="gender"
                    value={formData[field]}
                    label={field}
                    name={field}
                    error={error[field]} color={'secondary'}
                    fullWidth variant='outlined'
                    onChange={e => handleFormDataChange(e as React.ChangeEvent<HTMLInputElement>)}>
                      {[ 'male', 'female' ].map(el => {
                        return <MenuItem key={el} value={el} sx={({
                          color: 'primary.dark'
                        })}>{el}</MenuItem>
                      })}
                  </Select>
                </FormControl>
              </>
            }
          </Grid>
        ))}
      </Grid>
      <Button variant='outlined' color='inherit' type='submit'>{submitBtnTxt}</Button>
    </Box>
  )
}

export default ModelForm