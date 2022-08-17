


import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    mainNavLink: true,
    subNavLink: true,
    defaultNavLink: true,
    mainNavLinkActive: true,
    subNavLinkActive: true, 
    small: true,   
  }
}
declare module '@mui/material/styles' {
  
}
