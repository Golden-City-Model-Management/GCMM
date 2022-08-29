
import SearchBox from '@/components/common/searchbox'
import { Box } from '@mui/material'



const ModelsListSearchBar = ({ value, handleChange, handleSubmitSearch}:{
  value: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmitSearch: (e: React.KeyboardEvent) => void
}) => {

  return (
    <>
      <Box maxWidth='600px' position='sticky' zIndex='20'
        top='134px' width='80vw' mx='6vw' mb='4vh'
        sx={theme => ({ background: theme.palette.primary.main })}>
        <SearchBox placeholder="Search By Name" handleChange={handleChange} 
        value={value} handleKeyDown={handleSubmitSearch} />
      </Box>
    </>
  )
}

export default ModelsListSearchBar