
import { Model } from "@/context/models"
import ModelCardItem from './ModelCardItem'
import ImageList from '@mui/material/ImageList'

const ModelsList = ({ models }: {
  models: Model[]
}) => {
  console.log(models.length)

  return (
    <ImageList
    sx={{ width: '88vw', height: '75vh', margin: '0 auto' }}
    // variant="quilted"
    cols={4}
    rowHeight={150}>
     {
      models.map((model: Model) => <ModelCardItem key={model.id} model={model} />)
     }
    </ImageList>
  )
}

export default ModelsList