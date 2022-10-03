
import React from "react"
import { Typography } from "@mui/material"
import InfiniteScrollElement, { Props, } from "react-infinite-scroll-component"

const InfiniteScroll = ({ children, ...rest}: Props & {
   children:  React.ReactNode | React.ReactNode[],
  }) => {
  return (
    <InfiniteScrollElement
    {...rest}
    loader={<Typography textAlign='center' component='b' display='block' mx='auto' my={2} variant='body1'>Loading...</Typography>}
    endMessage={
      <Typography textAlign='center' component='b' display='block' mx='auto' my={2} variant='body1' >
        No more documents to load.
      </Typography>
    }>
     {children}      
   </InfiniteScrollElement>
  )
}

export default InfiniteScroll