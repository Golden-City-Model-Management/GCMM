

import NextHead from 'next/head'
import { HeadProps } from '@/types/layout'

const Head = ({ 
  title,
  description,
  favicon,
  canonical,
} : HeadProps) => {

  return (
    <NextHead>
      <title>{title}</title>
      <link rel='canonical' href={canonical || ''}/>
      <link rel='icon' href={favicon || '/logo.svg'} />
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='description' content={description} />
      <meta property='og:locale' content='en_US' />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={'Golden City Model Management'} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='https://goldencitymodelsng.netlify.app/assets/images/BG-05.jpg' />
      <meta property='og:url' content='https://goldencitymodelsng.netlify.app/' />
    </NextHead>
  )
}

export default Head