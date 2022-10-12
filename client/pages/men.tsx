

import { NextPageWithLayout } from '@/types/pages'
import getLayout from '@/utils/pages/getLayout'
import LayoutTwo from '@/components/layout/LayoutTwo'
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import ModelCard from '@/components/models/ModelCard';

const Men: NextPageWithLayout = () => {
  return (
    <Box component='article'> 
      <Typography variant='caption' component='h1' textAlign='center' my={3} fontWeight='400'>
        Men
      </Typography>

      <Box component='ul' display='flex' flexWrap='wrap' justifyContent='center' gap={3} padding={0} >
        {
          [1, 2,3,3,3,4,5,5,34,4,34, 1,2,2,2,22,2,2,22,2,2,2,22,2,2,2,2,2,2,22,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,,2,2,2,22,2,2,2,2222].map((e, i) => (
            <ModelCard component='li' key={i} />
          ))
        }
      </Box>
    </Box>
  )
}

const props = {
  title: 'Golden City Model Management | Men',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/logo.svg',
  pad: true,
  canonical: `${process.env.BASE_URL}/men`
}

Men.getLayout = getLayout(LayoutTwo, props)

export default Men