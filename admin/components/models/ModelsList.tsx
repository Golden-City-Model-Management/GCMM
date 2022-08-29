
import { Model } from "@/context/models"
import ModelCardItem from './ModelCardItem'
import ImageList from '@mui/material/ImageList'
import { ImageListSx } from './style'
import React from "react"
import Mapper from "../Mapper"

const ModelsList = ({ models,}: {
  models: Model[],
}) => {
  return (
    <ImageList
    sx={ImageListSx} cols={4}
    gap={40} rowHeight={350}>
      <Mapper list={models} mapKey='id' itemName="model" itemProps={{}} ComponentItem={ModelCardItem}  />
    </ImageList>
  )
}

export default ModelsList