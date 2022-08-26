import { rounded } from "@/styles/styles";
import { Theme } from "@mui/material";


export const formStyles = (theme: Theme) => ({
  borderRadius: rounded().md,
  background: theme.palette.primary.contrastText,
  color: theme.palette.primary.main,
  width: '90vw',
  maxWidth: '450px',
  height: '70vh',
  maxHeight: '600px',
  gap: '26px',
})

export const inputStyles = (theme: Theme) => ({
  '&.MuiInputBase-root, .MuiInput-root': {
    width: '100%',
  },
  color: theme.palette.primary.main,
  borderColor: 'currentColor',
  fontSize: '',
  '&:hover': {
    color: theme.palette.primary.main
  }
})

export const submitBtnStyles = (theme: Theme) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: '80%',
  minHeight: '55px',
})