

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ComingSoonPlaceholder = ({ page }: { page: string,}) => {

  return(
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh'}}>
      <Typography variant='caption' sx={{textAlign: 'center'}}>
        This is not the page you expected to see. 
        The {page} page will be available soon.         
      </Typography>
    </Box>
  )
}

export default ComingSoonPlaceholder