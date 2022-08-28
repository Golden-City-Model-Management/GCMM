
import { Model } from "@/context/models"
import ImageListItem from "@mui/material/ImageListItem"
import NextLink from 'next/link'
import NextImage from 'next/image'
import React from "react"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import IconButton from "@mui/material/IconButton"
import LaunchIcon from "@mui/icons-material/Launch"

const ModelCardItem = ({ model }: {
  model: Model
}) => {

  return (
    <NextLink href={`/models/${model.name}?id=${model.id}`} as={`/models/${model.name}`} passHref>
    <ImageListItem component='a' >
      <NextImage layout="fill" src={model.cover_image} style={{}} />
      <ImageListItemBar
        sx={{textTransform: 'uppercase'}}
        title={`${model.name}`}
        subtitle={model.height}
        actionIcon={
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            aria-label={`info about ${model.name}`}
          >
            <LaunchIcon />
          </IconButton>
        }
      />
    </ImageListItem>    
    </NextLink>

  )
}

export default ModelCardItem