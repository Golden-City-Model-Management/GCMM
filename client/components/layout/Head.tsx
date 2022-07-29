

import NextHead from 'next/head'

const Head = ({ 
  title,
  description,
  favicon,

} : {
  title: string,
  description: string,
  favicon?: string,

}) => {

  // Todo change url to site url when launched
  return (
    <NextHead>
      <title>{title}</title>
      <link rel='canonical' href='' />
      <link rel='icon' href={favicon || '/vercel.svg'} />
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='description' content={description} />
      <meta property='og:locale' content='en_US' />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={'Golden City Model Management'} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='/public/assets/images/BG-05.jpg' />
      <meta property='og:url' content='https://goldencitymodelsng.netlify.app/' />
    </NextHead>
  )
}

export default Head