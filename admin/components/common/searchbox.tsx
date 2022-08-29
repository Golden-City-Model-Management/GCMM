
import { SearchSharp } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import { ChangeEventHandler, KeyboardEventHandler } from 'react'

const SearchBox = ({ value, handleChange, placeholder, handleKeyDown }:{
  value: string,
  handleChange: ChangeEventHandler<HTMLInputElement>,
  handleKeyDown: KeyboardEventHandler<HTMLInputElement>,
  placeholder?: string
}) => {

  return (
    <Box 
    width='100%'
    component='div' display='flex' justifyContent='space-between'
     alignItems='center' p='.6rem 1rem' borderBottom='1px solid currentColor'
     boxShadow='inset 0px 11px 10px #fbfbfb1c'
     sx={theme => ({
      '&:hover': {
        color: theme.palette.secondary.main
      }
     })}>
    <Input  
    value={value} 
    onKeyDown={handleKeyDown}
    onChange={handleChange} 
    placeholder={placeholder || 'Search'}
    sx={{flexBasis: '92%', padding: 0}} />
    <SearchSharp />
    </Box>
  )
}

export default SearchBox