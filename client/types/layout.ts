
export interface HeadProps {
  title: string,
  description: string,
  favicon?: string,
  canonical?: string,
}
export interface LayoutProps extends HeadProps {
  children?: React.ReactNode | [React.ReactNode]
}