import { Theme } from "@mui/material"

export const rounded = () => ({
  circle: {
    borderRadius: '50%',
  },
  sm: {
    borderRadius: '8px',
  },
  md: {
    borderRadius: '12px'
  },
  lg: { 
    borderRadius: '15px'
  }
})

export const padded = () => ({
  sm: {
    padding: '8px 12px',
  },
  md: {
    padding: '12px 16px',
  },
  lg: {
    padding: '15px 20px',
  }
})

const base = {
  inherit: 'inherit',
  initial: 'initial',
  revert: 'revert',
  unset: 'unset',
}

export const display = {
  ...base,
  flex: 'flex',
  block: 'block',
  inlineBlock: 'inline-block',
  inlineFlex: 'inline-flex',
  contents: 'contents',
}
export const flexDirection = {
  ...base,
  row: 'row',
  rowReverse: 'row-reverse',
  column: 'column',
  columnReverse: 'column-reverse',
}
export const layout = {
  ...base,
  right: 'right',
  left: 'left',
  center: 'center',
  flexStart: 'flex-end',
  flexEnd: 'flex-end',
  spaceAround: 'space-around',
  spaceBetween: 'space-between',
  spaceEvenly: 'space-evenly',
  end: 'end',
  start: 'start',
  normal: 'normal',
  stretch: 'stretch',
  baseline: 'baseline',
  selfStart: 'self-start',
  selfEnd: 'self-end',
}

export const flexCenterCenter = {
  display: display.flex,
  justifyContent: layout.center,
  alignItems:layout.center
}
export const flexRowJustifyBetweenAlignCenter = () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})
