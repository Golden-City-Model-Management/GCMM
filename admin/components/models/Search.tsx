
import SearchBox from '@/components/common/searchbox'
import { Box } from '@mui/material'
import { ChangeEvent, ChangeEventHandler, useCallback, useContext } from 'react'
import { StoreContext, modelsReducer } from 'reducers/store'

const ModelsListSearchBar = () => {

  const { state: { models: { searchTerm }}, combinedDispatch: { modelsDispatch }  } = useContext(StoreContext)
  const { modelsActions: { handleSearchTermChange } } = modelsReducer

  const handleSearch: ChangeEventHandler<HTMLInputElement> = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
   const searchValue = e.target.value
   modelsDispatch({ type: handleSearchTermChange, payload: searchValue })
  }, [handleSearchTermChange, modelsDispatch])

  return (
    <>
      <Box maxWidth='600px' position='sticky' zIndex='20'
        top='134px' width='80vw' mx='6vw' mb='4vh'
        sx={theme => ({ background: theme.palette.primary.main })}>
        <SearchBox placeholder="Search By Name" handleChange={handleSearch} 
        value={searchTerm} />
      </Box>
    </>
  )
}

export default ModelsListSearchBar