import { getSlugs } from "../lib/api";

const DEFAULT_URL = "https://www.silanosrl.it";

function generateSiteMap(pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

     <url>
       <loc>${DEFAULT_URL}</loc>
     </url>
     <url>
       <loc>${DEFAULT_URL + "/contatti"}</loc>
     </url>
    <url>
        <loc>${DEFAULT_URL + "/cookie-policy"}</loc>
    </url>
    ${pages.data
      .map((slug) => {
        return `
        <url>
            <loc>${`${DEFAULT_URL}/${slug.attributes.slug}`}</loc>
        </url>
      `;
      })
      .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const { pages } = await getSlugs();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(pages);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
