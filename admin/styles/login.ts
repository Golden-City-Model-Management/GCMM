import { emphasize, Theme } from "@mui/material";

export const formStyles = (theme: Theme) => ({
  borderRadius: '12px',
  background: emphasize(theme.palette.primary.light, 1),
  color: theme.palette.primary.main,
  width: '90vw',
  maxWidth: '450px',
  height: '70vh',
  maxHeight: '600px',
  gap: '26px',
})

export const inputStyles = (theme: Theme) => ({ 
 '.MuiInputBase-root': {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
})

export const submitBtnStyles = (theme: Theme) => ({
  minHeight: '55px',
  borderRadius: '8px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: "1rem",
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[7],
  }
})