
import { Model } from "@/types/models"
import ModelCardItem from './ModelCardItem'
import ImageList from '@mui/material/ImageList'
import { ImageListSx } from './style'
import React from "react"
import Mapper from "../Mapper"
import { Typography } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"

const ModelsList = ({ models, handlePaginationWithScroll, shouldFetchWithPaginate }: {
  models: Model[],
  handlePaginationWithScroll: () => void,
  shouldFetchWithPaginate: boolean
}) => {
  return (
    <InfiniteScroll
      dataLength={models.length}
      next={handlePaginationWithScroll}
      hasMore={shouldFetchWithPaginate}
      loader={<h4>Loading...</h4>}
      endMessage={
        <Typography textAlign='center' component='b' display='block' mx='auto' my={2} variant='body1' >
          No more documents to load.
        </Typography>
      }>
      <ImageList
        sx={ImageListSx} cols={4}
        gap={40} rowHeight={350}>
        <Mapper list={models} mapKey='id' itemName="model" itemProps={{}} ComponentItem={ModelCardItem} />
      </ImageList>         
     </InfiniteScroll>
  )
}

export default ModelsList