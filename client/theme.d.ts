


import { Theme, ThemeOptions } from '@mui/material/styles';



declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {

  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {

  }
  interface BreakpointOverrides {
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}