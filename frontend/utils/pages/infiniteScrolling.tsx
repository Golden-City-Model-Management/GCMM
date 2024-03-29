
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import React, { useMemo, useState, useEffect, useContext } from "react";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from '@/components/common/InfiniteScroll';
import Request from '@/utils/client/request';
import ErrorDisplay from '@/components/common/ErrorDisplay';
import Button from '@mui/material/Button'
import { Skeletons } from '@/components/common/Skeleton';
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import { UIContext } from '@/context/context';

const PAGE_SIZE = 50;
const fetcher = async (url: string) => await Request({ path: url.split('/v1/')[1], method: 'get' })

export default function InfiniteScroller ({ name, pathAndQuery, ListItem, onEmptyMsg }:
   {name: string, 
    pathAndQuery: string
    ListItem: (props:{[x:string]: any}) => JSX.Element,
    onEmptyMsg?: string
  }) {

  const { marginBtwContainers } = useContext(UIContext)

  const [animateCards, setAnimateCards] = useState(false)
  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${process.env.NEXT_PUBLIC_SERVER_URL}${pathAndQuery}&limit=${PAGE_SIZE}&page=${index + 1
      }`,
    fetcher
  );

  const list = useMemo(() => {
    if(data){
      return new Array().concat(...data.map(el => {
        return el.docs
      }))
    }else return []
  }, [data]);
  const isLoadingInitialData = useMemo(() => !data && !error, [data, error])
  const isLoadingMore = useMemo(() => isLoadingInitialData || (size > 0 && data && data[size - 1]?.docs.length === PAGE_SIZE), 
  [isLoadingInitialData, size, data]);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      !animateCards && setAnimateCards(true)
    }, 1000)
    return () => {
      clearTimeout(animationTimeout)
    }
  }, [animateCards])
  
  return (
    <Box component='article' sx={error  && list.length === 0 ? { display: 'flex', justifyContent: 'center', 
      flexDirection: 'column', minHeight: '80vh'} : {}} margin={marginBtwContainers} marginLeft={0} marginRight={0} marginTop={0}>
        <Typography variant='caption' component='h1' textAlign='center' textTransform='capitalize' my={3} fontWeight='400'>
          {name}
        </Typography>
      <InfiniteScroll
        next={() => setSize((prev) => prev + 1)}
        hasMore={isLoadingMore || false} 
        loader={<Skeletons arrayLength={30} loading={isLoadingMore || false}/> } dataLength={size}
        endMessage={(!error ) ? 
        list.length === 0 && 
        <Typography variant='h2' textAlign='center' component='p'>
          {onEmptyMsg || <>The {name} page will be updated soon...</>}
        </Typography> :
          list.length === 0 && 
          <ErrorDisplay msg={'An Error Occured! \n This was not supposed to happen'}>
            <Button
              onClick={() => setSize(size)} sx={{ my: 5 }}
              size='large' variant='outlined' color='inherit'> Refresh </Button>
          </ErrorDisplay>}>
        <Grid container component='ul' justifyContent={{lg: 'start', xs: 'center'}} gap={3}>
          {
           list.map((item, i) => (
              <Grow key={i} mountOnEnter in={animateCards} style={{ transformOrigin: '0 0 0' }}
                {...(animateCards ? { timeout: i * 200 } : {})}>
                <Paper sx={{ backgroundColor: 'transparent' }} elevation={0}>
                   <ListItem item={item} component='li' key={i} />
                </Paper>
              </Grow>
            ))
          }
        </Grid>
      </InfiniteScroll>
    </Box>
  )
}