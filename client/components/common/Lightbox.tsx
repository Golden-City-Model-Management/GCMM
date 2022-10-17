import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ReactNode, useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p: 4,
  outline: '0',
  width: '70vw',
  height: '50vmax'
};

export default function Lightbox({children, handleClose, open} : {
  children: ReactNode | ReactNode[],
  handleClose: () => void,
  open: boolean
}) {

  return (
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box bgcolor='primary.light'  display='flex' justifyContent='center' alignItems='center' sx={style}>
            {children}
          </Box>
        </Fade>
      </Modal>
  );
}