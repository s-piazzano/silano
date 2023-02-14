import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="it" className="font-inter">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
