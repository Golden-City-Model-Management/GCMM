

export interface uiState {
  drawerWidth: number,
  bodyWidth:  string,
  showNav: false,
  fullHeightWithoutHeader: string,
  boxPadding: {
    lg: string,
    md: string,
    xs: string,
  },
  marginBtwContainers: string,
}

export const toggleShowNav = (state: uiState, payload: boolean ) => {
  return { ...state, showNav: payload }
}


