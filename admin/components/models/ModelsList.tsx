
import { Model } from "@/context/models"
import ModelCardItem from './ModelCardItem'
import ImageList from '@mui/material/ImageList'
import { ImageListSx } from './style'
import Mapper from "@/components/Mapper"

const ModelsList = ({ models }: {
  models: Model[]
}) => {
  return (
    <ImageList
    sx={ImageListSx} cols={4}
    gap={40} rowHeight={350}>
      <Mapper list={models} ComponentItem={ModelCardItem} mapKey={"id"} itemProps={{}} itemName={"model"} />
    </ImageList>
  )
}

export default ModelsList