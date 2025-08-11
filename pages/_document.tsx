import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="sl">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Voltage Elektroinštalacije s.p. - Profesionalne elektroinštalacije za vaš dom in podjetje" />
        <meta name="keywords" content="elektroinštalacije, elektrikar, električne napake, pametni dom, LED razsvetljava, Ljubljana" />
        <meta name="author" content="Voltage Elektroinštalacije s.p." />
        
        {/* Open Graph */}
        <meta property="og:title" content="Voltage Elektroinštalacije s.p." />
        <meta property="og:description" content="Profesionalne elektroinštalacije za vaš dom in podjetje" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="sl_SI" />
        

        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
