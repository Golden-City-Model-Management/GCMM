
import { SearchSharp } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import { ChangeEventHandler } from 'react'

const SearchBox = ({ value, handleChange, placeholder }:{
  value: string,
  handleChange: ChangeEventHandler<HTMLInputElement>,
  placeholder?: string
}) => {

  return (
    <Box 
    width='100%'
    component='div' display='flex' justifyContent='space-between'
     alignItems='center' p='.6rem 1rem' borderBottom='1px solid currentColor'
     sx={theme => ({
      '&:hover': {
        color: theme.palette.secondary.main
      }
     })}>
    <Input  
    value={value} 
    onChange={handleChange} 
    placeholder={placeholder || 'Search'}
    sx={{flexBasis: '92%', padding: 0}} />
    <SearchSharp />
    </Box>
  )
}

export default SearchBox