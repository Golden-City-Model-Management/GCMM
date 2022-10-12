

import { NextPageWithLayout } from '@/types/pages'
import LayoutTwo from '@/components/layout/LayoutTwo'
import getLayout from '@/utils/pages/getLayout'
import ComingSoonPlaceHolder from '@/components/common/ComingSoon'
import React, { useState, useMemo} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

const MainBoard: NextPageWithLayout = () => {

  return (
    <Box component='article'> 
      {/* <ComingSoonPlaceHolder page='Main Board' /> */}
      <Typography variant='caption' component='h1' textAlign='center' my={3} fontWeight='400'>
        Main Board
      </Typography>

      <Box>
        
      </Box>
    </Box>
  )
}

const props = {
  title: 'Golden City Model Management | Main Board',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
  pad: true,
}

MainBoard.getLayout = getLayout(LayoutTwo, props)

export default MainBoard