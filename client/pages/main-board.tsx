

import { NextPageWithLayout } from '@/types/pages'
import LayoutTwo from '@/components/layout/LayoutTwo'
import getLayout from '@/utils/pages/getLayout'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import ModelCard from '@/components/models/ModelCard';
import React, { useState } from "react";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from '@/components/common/InfiniteScroll';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 6;

const MainBoard: NextPageWithLayout = () => {
  const [repo, setRepo] = useState("reactjs/react-a11y");
  const [val, setVal] = useState(repo);

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `https://morning-hamlet-86693.herokuapp.com/api/v1/models?limit=${PAGE_SIZE}&page=${index + 1
      }`,
    fetcher
  );

  const issues = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && data[size - 1]?.length === PAGE_SIZE);
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;
  console.log(data, 'jhhjbj', size, issues, isLoadingMore)
  return (
    <Box component='article'>
      <Typography variant='caption' component='h1' textAlign='center' my={3} fontWeight='400'>
        Main Board
      </Typography>
      <InfiniteScroll next={() => setSize((prev) => prev + 1)} hasMore={isLoadingMore || false} loader={'Loading'} dataLength={size}>
        <Box component='ul' display='flex' flexWrap='wrap' justifyContent='center' gap={3} padding={0} >
          {
            [1, 2, 3, 3, 3, 4, 5, 5, 34, 4, 34, 1, 2, 2, 2, 22, 2, 2, 22, 2, 2, 2, 22, 2, 2, 2, 2, 2, 2, 22, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, , 2, 2, 2, 22, 2, 2, 2, 2222].fill(9, 10).map((e, i) => (
              <ModelCard component='li' key={i} />
            ))
          }
        </Box>
      </InfiniteScroll>
    </Box>
  )
}

const props = {
  title: 'Golden City Model Management | Main Board',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
  pad: true,
  canonical: `${process.env.BASE_URL}/main-board`
}

MainBoard.getLayout = getLayout(LayoutTwo, props)

export default MainBoard