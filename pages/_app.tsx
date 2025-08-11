// pages/_app.tsx
import type { AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
// Removed i18n import to avoid conflicts with custom LanguageProvider
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"

import { AuthProvider } from '../contexts/AuthContext';
import { LanguageProvider } from '../components/LanguageProvider'; // твојот LanguageProvider

function MyApp({ Component, pageProps, initialLang }: AppProps & { initialLang: 'sl' | 'en' }) {
  return (
    <>
      <Head>
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/front black.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/front black.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/front black.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Open Graph Meta Tags for Social Media Sharing */}
        <meta property="og:title" content="Voltage Elektroinštalacije s.p. - Profesionalne elektroinštalacije" />
        <meta property="og:description" content="Voltage Elektroinštalacije s.p. zagotavlja kakovostne elektro storitve v Sloveniji. Z več kot 10-letnimi izkušnjami smo vaš zanesljiv partner za vse električne potrebe." />
        <meta property="og:image" content="/front black.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://voltage-elektro.si" />
        <meta property="og:site_name" content="Voltage Elektroinštalacije s.p." />
        <meta property="og:locale" content="sl_SI" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Voltage Elektroinštalacije s.p. - Profesionalne elektroinštalacije" />
        <meta name="twitter:description" content="Voltage Elektroinštalacije s.p. zagotavlja kakovostne elektro storitve v Sloveniji. Z več kot 10-letnimi izkušnjami smo vaš zanesljiv partner za vse električne potrebe." />
        <meta name="twitter:image" content="/front black.png" />
        
        {/* Additional Meta Tags for Better Sharing */}
        <meta name="description" content="Voltage Elektroinštalacije s.p. zagotavlja kakovostne elektro storitve v Sloveniji. Z več kot 10-letnimi izkušnjami smo vaš zanesljiv partner za vse električne potrebe." />
        <meta name="keywords" content="elektroinštalacije, elektrikar, električne napake, pametni dom, LED razsvetljava, Ljubljana" />
        <meta name="author" content="Voltage Elektroinštalacije s.p." />
      </Head>
      <AuthProvider>
        <LanguageProvider initialLang={initialLang}>
          <Component {...pageProps} />
          <SpeedInsights />
          <Analytics />
        </LanguageProvider>
      </AuthProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  let lang: 'sl' | 'en' = 'sl';

  // 1. Проверка на cookie
  const cookieHeader = appContext.ctx.req?.headers.cookie || '';
  const match = cookieHeader.match(/NEXT_LOCALE=(\w+)/);
  if (match) {
    lang = match[1] as 'sl' | 'en';
  } else {
    // 2. Fallback на accept-language header
    const acceptLang = appContext.ctx.req?.headers['accept-language'] || '';
    if (acceptLang.startsWith('en')) lang = 'en';
  }

  return { ...appProps, initialLang: lang };
};

export default MyApp;
