import { Model } from "@/types/models"
import { Typography } from "@mui/material"



const NotFound = ({ searchTerm, models, initialStatusCode}: {
  searchTerm: string, models: Model[], initialStatusCode: number
}) => {

  return (
    <Typography variant='h1' >
    {(searchTerm.trim().length > 0 && models.length > 0) && 'No Models match your search'}
    {searchTerm.trim().length === 0 && (models.length === 0) && initialStatusCode !== 200 && 'Unable to fetch models. Please try again!'}
    {searchTerm.trim().length === 0 && (models.length === 0) && initialStatusCode === 200 && 'No Models.'}
  </Typography>
  )
}

export default NotFound