import { getHomepage } from "../lib/api";

import { useRef, useEffect } from "react";

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
      translateY: -120,
      opacity: 1,
    });
    tl.add({
      targets: "#homepageTitle",
      translateY: -120,
      opacity: 1,
    });
    tl.add({
      targets: "#homepageSlogan",
      translateY: -120,
      opacity: 1,
    });

    if (homepage.activities && homepage.activities.length)
      homepage.activities.map((x) =>
        tl.add({ targets: `#card-${x.id}`, translateY: -320, opacity: 1 })
      );
  });

  return (
    <Layout menu={menu} footerLayout={footerLayout}>
      <div>
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
      attributes: { subtitle, title, slogan, activities },
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
      },
      footerLayout,
    },
  };
}
