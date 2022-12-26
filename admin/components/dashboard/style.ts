import { Theme } from "@mui/material";


export const AvatarSx = (theme: Theme) => {

  return ({
    width: '65vw',
    height: '65vw',
    maxWidth: '120px',
    maxHeight: '120px', fontSize: '5rem',
    border: `1px solid ${theme.palette.secondary.main}`,
    background: theme.palette.primary.dark,
  })
}