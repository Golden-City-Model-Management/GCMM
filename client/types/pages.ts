

import { NextPage } from "next"
import { AppProps } from "next/app"

export type NextPageWithLayout = NextPage<{[x: string]: any}> & {
  getLayout: (page: React.ReactElement) => React.ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
