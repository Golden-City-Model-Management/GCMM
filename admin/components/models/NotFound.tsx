import { ModelSearchContext } from "@/context/model.search"
import { ModelsContext } from "@/context/models"
import { Typography } from "@mui/material"
import { useContext } from "react"



const NotFound = () => {

  const { modelsDisplayed, models: stateModels, } = useContext(ModelsContext)
  const { searchTerm } = useContext(ModelSearchContext)

  return (
    <Typography variant='h1' >
    {(searchTerm.trim().length > 0 && modelsDisplayed.length === 0) && 'No Models match your search'}
    {searchTerm.trim().length === 0 && (stateModels.length === 0 || modelsDisplayed.length === 0) && 'Unable to fetch models. Please try again!'}
  </Typography>
  )
}

export default NotFound