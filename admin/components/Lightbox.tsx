import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ReactNode, useCallback, useState } from 'react';
import { CloseOutlined } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  maxWidth: '800px',
  boxShadow: 24,
  p: 4,
  minHeight: '75vh' 
};

export default function Lightbox({ title, isOpen, close, children, showCloseBtn }: {
  title: string,
  isOpen: boolean,
  close: () => void,
  children: ReactNode | ReactNode[]
  showCloseBtn?: boolean
}) {
  const handleClose = useCallback(() => close(), [close])

  return (
    <>
      <Modal
        aria-labelledby={title}
        aria-describedby={`Lightbox for ${title}`}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box position='relative' borderRadius={1} bgcolor='primary.light' sx={style}>
          { showCloseBtn && <IconButton color='secondary'  onClick={handleClose} sx={{position: 'absolute', top: '5%', right: '5%'}}><CloseOutlined /></IconButton>}
            {children}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
