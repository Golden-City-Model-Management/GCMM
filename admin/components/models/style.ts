import { Theme } from "@mui/material/styles";


export const ImageLIDetails = (theme: Theme, showStats: boolean) => ({
    backgroundColor: '#00000099',
    transition: 'opacity .2s ease', 
    opacity: showStats ? 1 : 0
})

export const ImageListSx = (theme: Theme) => ({ 
  width: '88vw', height: 'auto', margin: '0 auto',
 [theme.breakpoints.down('md')]: {
  gridTemplateColumns: 'repeat(2, 1fr) !important'
 },
 [theme.breakpoints.down('sm')]: {
  gridTemplateColumns: 'repeat(1, 1fr) !important'
 }
})