import * as React from 'react';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors';
import { emphasize } from '@mui/material/styles';


const ErrorDisplay = ({ msg, children }: { msg: string, children?: React.ReactNode | React.ReactNode[] }) => {

  return (
    <Box  display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
      <Box component='svg' color={emphasize(red[500], .24)} fontSize='500px'><BrokenImageIcon  /></Box>
      <Typography variant='h1' component='p' textAlign='center' maxWidth={'25ch'}>{msg}</Typography>
      {children}
    </Box>
  )
}


export default ErrorDisplay