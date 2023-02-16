import { getMenu, getPage, getAllPages } from "../lib/api";

import { Remark } from "react-remark";

import Layout from "../components/layout/default";
import Collapse from "../components/ui/Collapse";
import DownloadArea from "../components/custom/downloadArea";
import Assistant from "../components/custom/assistant";

export default function Page({
  menu,
  page,
  componentPageDownload,
  componentCommonAssistant,
  footer,
}) {
  return (
    <Layout menu={menu} footerLayout={footer}>
      <div className="w-full h-full px-4 md:px-16 py-8 flex flex-col lg:flex-row">
        <div className="w-full ">
          <h1 className=" uppercase text-2xl ">{page.title}</h1>
          <Remark className="mt-8 text-xl break-words">
            {page.description}
          </Remark>

          {/* FAQ */}
          {page.faq && (
            <div className="w-full my-8">
              {page.faq.map((faq) => (
                <Collapse key={faq.id} title={faq.question}>
                  {faq.answer}
                </Collapse>
              ))}
            </div>
          )}
        </div>
        {/* Right Column */}
        {(componentCommonAssistant || componentPageDownload) && (
          <div className="w-full lg:w-4/12 lg:ml-4 flex flex-col space-y-4">
            {/* Assistant */}
            {componentCommonAssistant && (
              <Assistant component={componentCommonAssistant} />
            )}
            {}
            {/* Download Area */}
            {componentPageDownload && (
              <DownloadArea component={componentPageDownload} />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const pages = await getAllPages();
  const slugs = pages.map((x) => {
    params: x.attributes;
  });
  return {
    paths: [{ params: { slug: "rottamazione-veicolo" } }],
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;

  const { page, footer } = await getPage(slug);
  const { menu } = await getMenu("default");

  const componentPageDownload = page.attributes.layout.find(
    (x) => x.__typename === "ComponentPageDownload"
  );

  const componentCommonAssistant = page.attributes.layout.find(
    (x) => x.__typename === "ComponentCommonAssistant"
  );

  return {
    // Passed to the page component as props
    props: {
      menu,
      page: page.attributes,
      ...(componentPageDownload && { componentPageDownload }),
      ...(componentCommonAssistant && { componentCommonAssistant }),
      footer: footer.data.attributes.body,
    },
  };
}
