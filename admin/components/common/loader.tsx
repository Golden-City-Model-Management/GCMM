


import Backdrop, { BackdropProps } from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const Loader = ( { open }: {
  open: boolean;
} & BackdropProps ) => {

  return (
   <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}>
    <CircularProgress color="inherit" />
  </Backdrop>
  )
}

export default Loader