
import { Model } from "@/types/models"
import ImageListItem from "@mui/material/ImageListItem"
import Box from '@mui/material/Box';
import NextLink from 'next/link'
import NextImage from 'next/image'
import React, { RefObject, useMemo } from "react"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import IconButton from "@mui/material/IconButton"
import LaunchIcon from "@mui/icons-material/Launch"
import { useState, useCallback } from 'react'
import { ImageLIDetails, ImageLIBSx } from './style'
import { StatsKeyValPair } from './ModelData'

const ModelCardItem = React.forwardRef(({ model  }: { model: Model }, ref) => {
  const [showStats, setShowStats] = useState(false)
  const toggleShowStats = useCallback((show: boolean) => {
    setShowStats(show)
  }, [])
  const statKeys = useMemo(() => Object.keys(model).filter(key => (key !== 'id' && key !== 'cover_image')), [model])
  return (
    <NextLink href={`/models/${model.name}?id=${model.id}`} as={`/models/${model.name}`} passHref>
      <ImageListItem ref={ref as RefObject<HTMLAnchorElement>} onMouseEnter={() => toggleShowStats(true)} onMouseLeave={() => toggleShowStats(false)} sx={{ position: 'relative' }} component='a' >
        <NextImage priority={true} layout="fill" src={model.cover_image?.secure_url} />
        <Box
          visibility={showStats ? 'visible' : 'hidden'}
          zIndex={1} display='flex' flexDirection='column'
          gap={2} justifyContent='center' alignItems='center'
          position='absolute' top={0} left={0}
          width='100%' height='100%' sx={theme => ImageLIDetails(theme, showStats)}>
          {statKeys.map((key: string) => {
            const value = model[key as keyof Model]
            return <StatsKeyValPair color='secondary' value={value as string | number | undefined} key={key} title={key} />
          })
          }
        </Box>
        <ImageListItemBar
          onMouseLeave={() => showStats ? toggleShowStats(false) : toggleShowStats(true)}
          onMouseEnter={() => toggleShowStats(false)}
          sx={ImageLIBSx}
          title={`${model.name}`}
          subtitle={`Gender: ${model.gender}`}
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
})

ModelCardItem.displayName = 'ModelCardItem'

export default ModelCardItem