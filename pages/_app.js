import "../styles/globals.css";
import { CookiesProvider } from "react-cookie";
import { Analytics } from "@vercel/analytics/react";

import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <div className="">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7JB23TDQ7L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-7JB23TDQ7L');
        `}
        </Script>
        <Component {...pageProps} />

        <Analytics />
      </div>
    </CookiesProvider>
  );
}

export default MyApp;
