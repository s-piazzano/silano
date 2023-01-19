import { Inter } from "@next/font/google";
import "../styles/globals.css";

const inter = Inter({
  weight: '200',
  subsets: ['latin'],
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --inter-font: ${inter.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
