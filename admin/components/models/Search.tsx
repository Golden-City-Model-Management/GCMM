
import SearchBox from '@/components/common/searchbox'
import { Box } from '@mui/material'
import { ChangeEvent, ChangeEventHandler, KeyboardEventHandler, useCallback, useContext } from 'react'
import { ModelSearchContext } from '@/context/model.search'
import { ModelsContext } from '@/context/models'
import { Model } from '@/types/models'

const ModelsListSearchBar = () => {

  const { searchTerm, updateSearchTerm } = useContext(ModelSearchContext)
  const { models: stateModels, updateModels, updateModelsDisplayed, setErrorDisplayTxt, getModels, modelsDisplayed } = useContext(ModelsContext)

  const filteredModels = useCallback((models: Model[], search: string) => models.filter(el => el.name.split(' ').some(str => str.startsWith(search)) ||
  el.name.includes(search)), [])

const handleSearch: ChangeEventHandler<HTMLInputElement> = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
  const searchValue = e.target.value
  updateSearchTerm(searchValue)
  if (searchValue.trim().length === 0) {
    return updateModelsDisplayed(stateModels)
  }
  if(modelsDisplayed.length === 0 && searchValue.trim().length > 0){
    setErrorDisplayTxt('No models match your search!')
  }
  if (filteredModels(stateModels, searchValue).length > 0) {
    updateModelsDisplayed(filteredModels(stateModels, searchValue))
  } else {
    updateModelsDisplayed(filteredModels(stateModels, searchValue))
  }
}, [filteredModels, modelsDisplayed, setErrorDisplayTxt, stateModels, updateModelsDisplayed, updateSearchTerm])

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