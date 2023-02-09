import { getMenu, getFooter, getContact } from "../lib/api";

import { Remark } from "react-remark";

import Layout from "../components/layout/default";

import Maps from "../components/custom/maps";

export default function Contatti({ menu, footer, contact }) {
  return (
    <Layout menu={menu} footerLayout={footer}>
      <div className="w-full flex flex-col lg:flex-row px-4 md:px-16 py-8">
        <div className="w-full lg:w-1/2">
          <Remark
            rehypeReactOptions={{
              components: {
                h2: (props) => <h2 className="my-1" {...props} />,
                h3: (props) => <h2 className="my-1" {...props} />,
                h4: (props) => (
                  <h4 className="font-bold text-forest" {...props} />
                ),
              },
            }}
          >
            {contact.data.attributes.description}
          </Remark>
        </div>
        <div className="w-full lg:w-1/2">
          <Maps width={300} height={500} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { footer } = await getFooter();
  const { menu } = await getMenu("default");
  const { contact } = await getContact();

  return {
    // Passed to the page component as props
    props: {
      menu,
      contact,
      footer: footer.data.attributes.body,
    },
  };
}
