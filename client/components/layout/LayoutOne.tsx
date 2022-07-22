 

import { useContext } from 'react'
import { UIContext } from '@/context/ui'
import { LayoutProps } from '@/types/layout'
import Head from './Head'
import Header from '@/components/header/Header'
import Box from '@mui/material/Box'

const LayoutWithFixedNavInDesktop = ({ children, ...headProps }: LayoutProps) => {

  const { bodyWidth, fullHeightWithoutHeader } = useContext(UIContext)
  return (
    <>
      <Header showMenuBtnAlways={false} />
      <Head {...headProps} />
      <Box
       sx={(theme) => ({
        borderRight: { lg: `2px solid ${theme.palette.secondary.light}`},
        width: { lg: bodyWidth },
        minHeight: fullHeightWithoutHeader,
        background: theme.palette.primary.main,
       })}
       component='main' >
        {children}
      </Box>
    </>
  )
} 

export default LayoutWithFixedNavInDesktop