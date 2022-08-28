
import { Model } from "@/context/models"
import ModelCardItem from './ModelCardItem'
import ImageList from '@mui/material/ImageList'

const ModelsList = ({ models }: {
  models: Model[]
}) => {

  return (
    <ImageList
    sx={theme => ({ 
      width: '88vw', height: '75vh', margin: '0 auto',
     [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr) !important'
     },
     [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr) !important'
     }
    })}
    cols={4}
    gap={40}
    rowHeight={350}>
     {
      models.map((model: Model) => <ModelCardItem key={model.id} model={model} />)
     }
    </ImageList>
  )
}

export default ModelsList