
import { LayoutProps } from '@/types/layout'


export default function (
  Layout: (props: LayoutProps) => React.ReactElement,
  props: LayoutProps
) {

  return (page: React.ReactElement) => {
    return (
      <Layout {...props}>
        {page}
      </Layout>
    )
  }
}
