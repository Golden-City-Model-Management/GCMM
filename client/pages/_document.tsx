import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async defer src="//www.instagram.com/embeds.js"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
          <link href="https://fonts.googleapis.com/css2?family=Poppins@1&display=swap" rel="stylesheet"></link>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
        )
}