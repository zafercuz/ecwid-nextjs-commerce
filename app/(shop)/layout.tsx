// import { GoogleTagManager,  } from '@next/third-parties/google';
import Navbar from 'components/layout/navbar';
import { GeistSans } from 'geist/font';
import { ensureStartsWith } from 'lib/utils';
import Script from 'next/script';
import { ReactNode, Suspense } from 'react';
import '../globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        <>
          <Script
            id="google-tag-manager"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                    (function(w,d,s,l,i){
                      w[l]=w[l]||[];
                      w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                      var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),
                      dl=l!='dataLayer'?'&l='+l:'';
                      j.async=true;
                      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                      f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-PTP34FN8');
                  `
            }}
          />
        </>
      </head>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PTP34FN8"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>

      {/* <GoogleTagManager gtmId="GTM-PTP34FN8"  /> */}
    </html>
  );
}
