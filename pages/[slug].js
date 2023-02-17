import { getMenu, getPage, getAllPages } from "../lib/api";

import { Remark } from "react-remark";

import Layout from "../components/layout/default";
import Collapse from "../components/ui/Collapse";
import DownloadArea from "../components/custom/downloadArea";
import Assistant from "../components/custom/assistant";
import Card from "../components/ui/card";

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
          {/* Page title */}
          <h1 className=" uppercase text-2xl mb-4">{page.title}</h1>
          {/* Page description */}
          <Remark className="mt-8 text-xl break-words">
            {page.description}
          </Remark>

          {/* FAQ */}
          {page.faq && (
            <div className="w-full my-12">
              {page.faq.map((faq) => (
                <Collapse key={faq.id} title={faq.question}>
                  {faq.answer}
                </Collapse>
              ))}
            </div>
          )}
          {/* Activities */}
          {page.activities && (
            <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 justify-start items-stretch">
              {page.activities.map((activity) => {
                return (
                  <Card
                    className="w-full md:w-60"
                    containerClass="px-2"
                    titleClass="text-base"
                    descriptionClass="text-sm"
                    linkClass="px-2"
                    id={`activity-car-${activity.id}`}
                    key={activity.id}
                    title={activity.title}
                    description={activity.description}
                    link={activity.link}
                    imageUrl={
                      activity.image?.data?.attributes?.formats?.medium?.url
                    }
                  ></Card>
                );
              })}
            </div>
          )}
        </div>
        {/* Right Column */}
        {/* if ComponentAssistant and ComponentDownlo are defined show column */}
        {(componentCommonAssistant || componentPageDownload) && (
          <div className="w-full lg:w-5/12 xl:w-4/12 lg:ml-4 flex flex-col space-y-4">
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

  // Automatic generation of paths
  const slugs = pages.map(
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
