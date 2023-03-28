import { getAllProducts } from "../../lib/api";

import { useRef, useEffect } from "react";

import Head from "next/head";

import Layout from "../../components/layout/default";

export default function Product() {
  return <div>ciao</div>;
  /*  <Layout menu={menu} footerLayout={footerLayout}>
      <Head>
        <title>{homepage.seo.title}</title>
        <meta property="og:title" content={homepage.seo?.title} />
        <meta property="og:description" content={homepage.seo?.description} />
        <meta
          property="og:image"
          content={homepage.seo?.image?.data?.attributes.url}
        />
      </Head>
      <div className="w-full"></div>
    </Layout>
  ); */
}

/* export async function getStaticPaths() {
  const products = await getAllProducts();
  console.log(products);
  // Automatic generation of paths
  const slugs = products.map(
    (x) =>
      new Object({
        params: x.attributes,
      })
  );
  return {
    paths: slugs,
    fallback: false, // can also be true or 'blocking'
  };
} */

export async function getStaticProps(context) {
  const slug = context.params.slug;
  console.log(slug);
  return {
    props: {},
  };
}
