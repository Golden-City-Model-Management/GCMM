
import { LayoutProps } from '@/types/layout'
import { ReactElement, JSXElementConstructor } from 'react'


export default function getLayout (
  Layout: (props: LayoutProps) => React.ReactElement,
  props: LayoutProps
) {

  return function PageWithLayout (page: ReactElement<any, string | JSXElementConstructor<any>>){
    return (
      <Layout {...props}>
        {page}
      </Layout>
    )
  }
}
