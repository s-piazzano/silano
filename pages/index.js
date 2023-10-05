import { getHomepage } from "../lib/api";

import { useRef, useEffect } from "react";
import Head from "next/head";

import anime from "animejs";

import Layout from "../components/layout/default";

import Header from "../components/header";
import Activities from "../components/custom/activities";
import Maps from "../components/custom/maps";
import Footer from "../components/footer";

export default function Home({ menu, homepage, footerLayout }) {
  useEffect(() => {
    var tl = anime.timeline({
      easing: "easeOutExpo",
      duration: 400,
    });
    tl.add({
      targets: "#homepageSubtitle",
      translateY: -70,
      opacity: 1,
    });
    tl.add({
      targets: "#homepageTitle",
      translateY: -70,
      opacity: 1,
    });
    tl.add({
      targets: "#homepageSlogan",
      translateY: -70,
      opacity: 1,
    });

    if (homepage.activities && homepage.activities.length)
      homepage.activities.map((x) =>
        tl.add({ targets: `#card-${x.id}`, translateY: -430, opacity: 1 })
      );
  });

  return (
    <Layout menu={menu} footerLayout={footerLayout}>
      <Head>
        <title>{homepage.seo.title}</title>
        <meta name="description" content={homepage.seo?.description} />
        <meta property="og:title" content={homepage.seo?.title} />
        <meta property="og:description" content={homepage.seo?.description} />
        <meta
          property="og:image"
          content={homepage.seo?.image?.data?.attributes.url}
        />
      </Head>
      <div className="w-full">
        <Header
          menu={menu}
          title={homepage.title}
          subtitle={homepage.subtitle}
          slogan={homepage.slogan}
        />
        <Activities className="" activities={homepage.activities} />
        <Maps className="px-4 md:px-16 py-8" height={400} />
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
