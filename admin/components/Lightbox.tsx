import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { ReactNode, useCallback, useState } from 'react';
import { CloseOutlined } from '@mui/icons-material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  maxWidth: '80vw',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  height: '100%'
};
export default function Lightbox({ title, isOpen, close, children, maxHeight, showCloseBtn }: {
  title: string,
  isOpen: boolean,
  close: () => void,
  children: ReactNode | ReactNode[]
  showCloseBtn?: boolean,
  maxHeight?: string
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
          <Grid borderRadius={1} bgcolor='primary.light' maxHeight={maxHeight || '100%'} sx={style}>
          {showCloseBtn && 
          <IconButton 
            color='secondary' 
            size='large'  
            onClick={handleClose} 
            sx={{ display: 'block', marginLeft: 'auto'}} >
            <CloseOutlined />
          </IconButton>}
            {children}
          </Grid>
        </Fade>
      </Modal>
    </>
  );
}
