import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid'

interface MediaProps {
  loading?: boolean;
}

function SkeletonElement(props: MediaProps) {
  const { loading = false } = props;

  if(!loading) return <></>

  return (
    <Box>
      <Skeleton variant="rectangular" width={280} height={118} />
      <Skeleton  width={280} variant='text'  />
      <Skeleton  width={280} variant='text' />
    </Box>
  );
}


export const Skeletons = ({
  arrayLength,
  loading
}: {
  arrayLength: number,
  loading: boolean
}) => {

  return (
    <Grid container gap={3} justifyContent='center'>
      {new Array(arrayLength).fill(1).map((el, idx) => (
        <SkeletonElement key={idx} loading={loading} />
      ))}
    </Grid>
  )
}

export default SkeletonElement