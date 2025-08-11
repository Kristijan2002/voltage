// pages/_app.tsx
import type { AppProps } from 'next/app';
import App from 'next/app';
import '../styles/globals.css';
// Removed i18n import to avoid conflicts with custom LanguageProvider
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"

import { AuthProvider } from '../contexts/AuthContext';
import { LanguageProvider } from '../components/LanguageProvider'; // твојот LanguageProvider

function MyApp({ Component, pageProps, initialLang }: AppProps & { initialLang: 'sl' | 'en' }) {
  return (
    <AuthProvider>
      <LanguageProvider initialLang={initialLang}>
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
      </LanguageProvider>
    </AuthProvider>
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
