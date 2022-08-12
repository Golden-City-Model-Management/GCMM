


import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    mainNavLink: true,
    subNavLink: true,
    mainNavLinkActive: true,
    subNavLinkActive: true, 
    small: true,   
  }
}
declare module '@mui/material/styles' {
  interface Theme {
    adminPalette: {
      main: string,
      light: string,
      dark: string,
      contrastText: string
    },
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    adminPalette?: {
      main: string,
      light: string,
      dark: string,
      contrastText: string
    },
  }
  // export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
