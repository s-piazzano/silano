import Link from "next/link";
 

import { useRouter } from "next/router";

import Head from "next/head";

import { getSlugs, getPage, getMenu, getProductBySlug } from "../../lib/api";

import Layout from "../../components/layout/default";
import Gallery from "../../components/ui/Gallery";
import Collapse from "../../components/ui/Collapse";

export default function Ricambi({ menu, product, footer }) {
  const { asPath, push } = useRouter();

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
Offriamo come ricambio usato funzionante ${sub[0].attributes.name} per:
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

Rispondiamo quotidianamente alle vostre e-mail e Whatsapp.
  
Possibilità di spedizione in tutta Italia
    `;
    
  };

  const openWhatsapp = (e, product) => {
    
    e.preventDefault()
    console.log('ciao')
    const link = `https://wa.me/+393929898074?text=Ciao Silano SRL, ti contatto in merito all'annuncio ${
      "https://www.silanosrl.it" + asPath
    } (non modificare). ${
      product.attributes.price
        ? "Come posso procedere all'acquisto?"
        : "Vorrei conoscere una quotazione."
    }`;
    push(link)
  };

  return (
    <div className="">
      {product && (
        <Layout menu={menu} footerLayout={footer}>
          <Head>
            <title>
              Silano SRL -{" "}
              {product.attributes.title
                ? product.attributes.title
                : generateTitle(
                    product.attributes.sub_category.data,
                    product.attributes.compatibilities,
                    product.attributes.OE,
                    product.attributes.motorType
                  )}
            </title>
            <meta
              property="og:title"
              content={
                product.attributes.title
                  ? product.attributes.title
                  : generateTitle(
                      product.attributes.sub_category.data,
                      product.attributes.compatibilities,
                      product.attributes.OE,
                      product.attributes.motorType
                    )
              }
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
                product.attributes.images.data.length &&
                product.attributes.images.data[0].attributes.formats.small.url
              }
            />
          </Head>
          <div className="px-4 md:px-16 py-8 flex flex-col md:flex-row ">
            <h1 className="md:hidden text-lg font-semibold mb-4">
              {product.attributes.title
                ? product.attributes.title
                : generateTitle(
                    product.attributes.sub_category.data,
                    product.attributes.compatibilities,
                    product.attributes.OE,
                    product.attributes.motorType
                  )}
            </h1>
            <Gallery className="" images={product.attributes.images}></Gallery>

            <div className=" flex flex-col pt-8 md:pl-8 md:pt-0">
              <h1 className="hidden md:block text-lg font-semibold">
                {product.attributes.title
                  ? product.attributes.title
                  : generateTitle(
                      product.attributes.sub_category.data,
                      product.attributes.compatibilities,
                      product.attributes.OE,
                      product.attributes.motorType
                    )}
              </h1>
              <div className="whitespace-pre-wrap">
                {generateDescription(
                  product.attributes.sub_category.data,
                  product.attributes.compatibilities,
                  product.attributes.description
                )}
              </div>
              {/* Collapse */}
              {!product.attributes.price && (
                <Collapse
                  className="w-full md:w-96"
                  title="Perché il prezzo non è definito?"
                >
                  <p>
                    I prezzi sui ricambi sono in continua evoluzione. Per
                    garantirti la migliore quotazione contattaci direttamente
                    per conoscere il prezzo.
                  </p>
                </Collapse>
              )}
              {/* Button */}
              <button name="acquista" className="w-64 h-12 bg-forest text-white rounded-sm uppercase mt-4 flex justify-center items-center px-4" onClick={(e)=>openWhatsapp(e, product)}>
                ACQUISTA
              </button>
              <div className="flex flex-col mt-8">
                <h2 className="font-semibold">
                  Non sei sicuro della compatibilità o hai bisogno di maggiori
                  informazioni?
                </h2>
                <h2 className="font-normal mt-2">
                  Non esitare a contattarci. Siamo a tua disposizione
                </h2>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4"
                  href={`https://wa.me/+393929898074?text=Ciao Silano SRL, ti contatto in merito all'annuncio ${
                    "https://www.silanosrl.it" + asPath
                  } (non modificare). Avrei bisogno di informazioni ...`}
                >
                  Scrivici su Whatsapp (+39 392 9898 074) - clicca qui
                </a>
                <div className="flex flex-col md:flex-row mt-1">
                  <p>Se preferisci scrivere una e-mail:</p>
                  <a
                    href="mailto:ricambisilano@gmail.com"
                    className="ml-0 md:ml-2"
                  >
                    ricambisilano@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </div>
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
    fallback: true, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;

  const { footer } = await getPage(slug);
  const { menu } = await getMenu("default");

  const { product } = (await getProductBySlug(slug)) ?? null;

  if (!product || typeof product === "undefined") {
    return {
      notFound: true,
    };
  }

  return {
    // Passed to the page component as props
    props: {
      menu,
      product,
      footer: footer.data.attributes.body,
    },
    revalidate: 60,
  };
}
