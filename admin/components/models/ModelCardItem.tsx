
import { Model } from "@/context/models"
import ImageListItem from "@mui/material/ImageListItem"
import Box from '@mui/material/Box';
import NextLink from 'next/link'
import NextImage from 'next/image'
import React, { useMemo } from "react"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import IconButton from "@mui/material/IconButton"
import LaunchIcon from "@mui/icons-material/Launch"
import { useState, useCallback } from 'react'
import Typography from "@mui/material/Typography";
import { ImageLIDetails, ImageLIBSx } from './style'

const KeyValueData = ({ objKey, value }: { objKey: string, value: string | number | undefined }) => {
  return (
    <Typography textTransform='capitalize' color='secondary' key={objKey}>
      {objKey}: &nbsp;{typeof value === 'string' ? value.charAt(0).toUpperCase() + value.slice(1) : value}
    </Typography>
  )
}
const ModelCardItem = ({ model }: { model: Model }) => {
  const [showStats, setShowStats] = useState(false)
  const toggleShowStats = useCallback((show: boolean) => {
    setShowStats(show)
  }, [])
  const statKeys = useMemo(() => Object.keys(model).filter(key => (key !== 'id' && key !== 'cover_image')), [model])
  return (
    <NextLink href={`/models/${model.name}?id=${model.id}`} as={`/models/${model.name}`} passHref>
      <ImageListItem onMouseEnter={() => toggleShowStats(true)} onMouseLeave={() => toggleShowStats(false)} sx={{ position: 'relative' }} component='a' >
        <NextImage priority layout="fill" src={model.cover_image} />
        <Box
          visibility={showStats ? 'visible' : 'hidden'}
          zIndex={1} display='flex' flexDirection='column'
          gap={2} justifyContent='center' alignItems='center'
          position='absolute' top={0} left={0}
          width='100%' height='100%' sx={theme => ImageLIDetails(theme, showStats)}>
          {statKeys.map((key: string) => {
            const value = model[key as keyof Model]
            return <KeyValueData value={value} key={key} objKey={key} />
          })
          }
        </Box>
        <ImageListItemBar
          onMouseLeave={() => showStats ? toggleShowStats(false) : toggleShowStats(true)}
          onMouseEnter={() => toggleShowStats(false)}
          sx={ImageLIBSx}
          title={`${model.name}`}
          subtitle={`Age: ${model.age}`}
          actionIcon={
            <IconButton
              aria-label={`more info about ${model.name}`}>
              <LaunchIcon />
            </IconButton>
          }
        />
      </ImageListItem>
    </NextLink>

  )
}

export default ModelCardItem