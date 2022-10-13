
import React from "react"
import { Typography } from "@mui/material"
import InfiniteScrollElement, { Props, } from "react-infinite-scroll-component"

const InfiniteScroll = ({ children, ...rest}: Props & {
   children:  React.ReactNode | React.ReactNode[] | undefined
  }) => {
  return (
    <InfiniteScrollElement
    {...rest}
    endMessage={rest.endMessage}>
     {children}      
   </InfiniteScrollElement>
  )
}

export default InfiniteScroll
