import { getHomepage } from "../lib/api";

import Head from "next/head";
import Link from "next/link";

import Layout from "../components/layout/default";



export default function Home({ menu, homepage, footerLayout }) {
  
  return (
    <Layout menu={menu} footerLayout={footerLayout}>
      <Head>
        <title>Silano SRL - Pagina non trovata</title>
      </Head>
      <div className="w-full">
        <div className="h-screen flex flex-col justify-center items-center -mt-20">
            <h1 className="text-8xl font-light">404</h1>
            <h1 className="text-xl font-extralight">Ops, la pagina non è stata trovata</h1>
            <Link href="/" className="mt-8">Torna alla pagina principale</Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { menu, homepage, footer } = await getHomepage("default");
  const {
    attributes: {
      logo: {
        data: {
          attributes: { url: imageUrl },
        },
      },
      hours,
      contact,
      layout,
    },
  } = menu.data[0];

  const {
    data: {
      attributes: { subtitle, title, slogan, activities, seo },
    },
  } = homepage;

  const {
    data: {
      attributes: { body: footerLayout },
    },
  } = footer;

  return {
    props: {
      menu: {
        imageUrl,
        hours,
        contact,
        layout,
      },
      homepage: {
        subtitle,
        title,
        slogan,
        activities,
        seo,
      },
      footerLayout,
    },
  };
}
