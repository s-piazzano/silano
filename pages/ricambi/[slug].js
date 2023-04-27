import Link from "next/link";

import { useRouter } from "next/router";

import Head from "next/head";

import { getSlugs, getPage, getMenu, getProductBySlug } from "../../lib/api";

import Layout from "../../components/layout/default";
import Gallery from "../../components/ui/Gallery";

export default function Ricambi({ menu, product, footer }) {
  const { asPath } = useRouter();

  const generateTitle = (subs, comps, oe = "", motorType = "") => {
    return ` ${subs[0].attributes.name} ${comps
      .map(
        (comp) =>
          `${comp.make.data ? comp.make.data.attributes.name : ""} ${
            comp.model.data ? comp.model.data.attributes.name : ""
          } ${
            comp.engine_capacity.data && comp.engine_capacity.data.id != 5
              ? comp.engine_capacity.data.attributes.capacity
              : ""
          } ${
            comp.fuel_system.data && comp.fuel_system.data.id != 8
              ? comp.fuel_system.data.attributes.name
              : ""
          }`
      )
      .join(" / ")} ${oe ? oe : ""} ${motorType ? motorType : ""}`;
  };

  const generateDescription = (sub, comps, description) => {
    return `${
      description
        ? description
        : `
      Autodemolizione specializzata nella vendita ricambi usati. 
      Offriamo come ricambio usato funzionante ${sub.name} per:
      ${comps
        .map(
          (comp) =>
            `- ${comp.make.data ? comp.make.data.attributes.name : ""} ${
              comp.model.data ? comp.model.data.attributes.name : ""
            }`
        )
        .join("")}
  
      Disponiamo di ricambi per carrozzeria, meccanica, parti elettriche ed elettroniche, selleria...
      I ricambi sono accuratamente smontati e catalogati in magazzino da personale qualificato.
   `
    }

Rispondiamo quotidianamente alle vostre e-mail e whatsapp.
  
Possibilità di spedizione in tutta Italia
    `;
  };

  return (
    <Layout menu={menu} footerLayout={footer}>
      <Head>
        <title>
          Silano SRL -{" "}
          {generateTitle(
            product.attributes.sub_category.data,
            product.attributes.compatibilities,
            product.attributes.OE,
            product.attributes.motorType
          )}
        </title>
        <meta
          property="og:title"
          content={generateTitle(
            product.attributes.sub_category.data,
            product.attributes.compatibilities,
            product.attributes.OE,
            product.attributes.motorType
          )}
        />
        <meta
          property="og:description"
          content={generateDescription(
            product.attributes.sub_category.data,
            product.attributes.compatibilities,
            product.attributes.description
          )}
        />
        <meta
          property="og:image"
          content={
            product.attributes.images.data[0].attributes.formats.small.url
          }
        />
      </Head>
      <div className="px-4 md:px-16 py-8 flex flex-col md:flex-row">
        <Gallery className="" images={product.attributes.images}></Gallery>

        <div className="flex flex-col pt-8 md:pl-8 md:pt-0">
          <h1 className="sm:hidden md:block text-lg font-semibold">
            {generateTitle(
              product.attributes.sub_category.data,
              product.attributes.compatibilities,
              product.attributes.OE,
              product.attributes.motorType
            )}
          </h1>
          <div className="whitespace-pre-wrap mt-4">
            {generateDescription(
              product.attributes.sub_category.data,
              product.attributes.compatibilities,
              product.attributes.description
            )}
          </div>

          <Link
            className="w-40 h-12 bg-forest text-white rounded-sm uppercase mt-4 flex justify-center items-center px-4"
            href={`https://wa.me/+393929898074?text=Ciao Silano SRL, ti contatto in merito all'annuncio ${
              "https://www.silanosrl.it" + asPath
            }.`}
            passHref={true}
          >
            <div className="flex flex-col text-center items-center">
              <p className="">
                ACQUISTA
                {product.attributes.price
                  ? " - " + product.attributes.price + " €"
                  : ""}
              </p>
              <p className="uppercase text-xs">whatsapp</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { products } = await getSlugs();

  // Automatic generation of paths
  const slugs = products.data.map(
    (x) =>
      new Object({
        params: x.attributes,
      })
  );
  return {
    paths: slugs,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;

  const { footer } = await getPage(slug);
  const { menu } = await getMenu("default");

  const { product } = await getProductBySlug(slug);

  return {
    // Passed to the page component as props
    props: {
      menu,
      product,
      footer: footer.data.attributes.body,
    },
  };
}