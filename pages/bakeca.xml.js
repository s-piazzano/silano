import { getBakecaItems } from "../lib/api";

function generateBakecaXml(items) {
  const idCity = 92;
  const idCat = 203;
  const istat = 2150;
  const email = "ricambisilano@gmail.com";

  function generateTitle(item) {
    return ` ${
      item.attributes.sub_category.data[0].attributes.name
    } ${item.attributes.compatibilities
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
      .join(" / ")} ${
      item.attributes.OE ? item.attributes.OE.toUpperCase() : ""
    }`;
  }

  function generateDescription(item) {
    return `
      Il prezzo di 1€ è indicativo - Contattaci per conoscere la quotazione effettiva.

      Autodemolizione specializzata nella vendita ricambi usati. 
      Offriamo come ricambio usato funzionante ${
        item.attributes.sub_category.data[0].attributes.name
      } per:
      ${item.attributes.compatibilities
        .map(
          (comp) =>
            `- ${comp.make.data ? comp.make.data.attributes.name : ""} ${
              comp.model.data ? comp.model.data.attributes.name : ""
            }`
        )
        .join("")}

      Disponiamo di ricambi per carrozzeria, meccanica, parti elettriche ed elettroniche, selleria...
      I ricambi sono accuratamente smontati e catalogati in magazzino da personale qualificato.
      
      Rispondiamo quotidianamente alle vostre e-mail.
 
      Possibilità di spedizione in tutta Italia
      `;
  }
  function generatePrice(item) {
    if (item.attributes.price) return Math.round(item.attributes.price);
    return 1;
  }

  const xmlFile = `
    <ITEMLIST>
    ${items
      .map((item) => {
        if (item.attributes.images && item.attributes.images.data.length) {
          return `<ITEM ID="${
            item.id
          }" CITYID="${idCity}" CATEGORYID="${idCat}" LASTUPDATE="${new Date(
            item.attributes.updatedAt
          ).toUTCString()}" EXPIRED="0">
            <ISTAT>${istat}</ISTAT>
            <TITLE><![CDATA[${generateTitle(item)}]]></TITLE>
            <TEXT><![CDATA[${generateDescription(item)}]]></TEXT>
            <EMAIL>${email}</EMAIL>
            <ATTRIBUTELIST>
              <ATTRIBUTE>
                <ATTRID>4</ATTRID>
                <ATTRNAME><![CDATA[Azienda]]></ATTRNAME>
                <ATTRVAL><![CDATA[]]></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>indirizzoagenzia</ATTRID>
                <ATTRNAME></ATTRNAME>
                <ATTRVAL><![CDATA[Cascina Fiorina]]></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>ncivicoagenzia</ATTRID>
                <ATTRNAME></ATTRNAME>
                <ATTRVAL><![CDATA[SNC]]></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>comuneagenzia</ATTRID>
                <ATTRNAME></ATTRNAME>
                <ATTRVAL><![CDATA[Tronzano Vercellese]]></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>capagenzia</ATTRID>
                <ATTRNAME></ATTRNAME>
                <ATTRVAL><![CDATA[13049]]></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>pivaagenzia</ATTRID>
                <ATTRNAME></ATTRNAME>
                <ATTRVAL><![CDATA[02397390028]]></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>contattotelefonico</ATTRID>
                <ATTRNAME></ATTRNAME>
                <ATTRVAL><![CDATA[+390161930380]]></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>contattotelefonico2</ATTRID>
                <ATTRNAME></ATTRNAME>
                <ATTRVAL><![CDATA[+393929898074]]></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>logoagenzia</ATTRID>
                <ATTRNAME></ATTRNAME>
                <ATTRVAL><![CDATA[https://silano-3r.fra1.digitaloceanspaces.com/3r/96a20c88b9d573b3f830834a54ad3f79.jpg?updated_at=2023-01-20T15:37:16.481Z]]></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>linkagenzia</ATTRID>
                <ATTRNAME></ATTRNAME>
                <ATTRVAL><![CDATA[www.silanosrl.it]]></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>tipocomprovendo</ATTRID>
                <ATTRNAME><![CDATA[2190]]></ATTRNAME>
                <ATTRVAL></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>tiporicambiaccessori</ATTRID>
                <ATTRNAME><![CDATA[10]]></ATTRNAME>
                <ATTRVAL></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>condizionericambi</ATTRID>
                <ATTRNAME><![CDATA[2738]]></ATTRNAME>
                <ATTRVAL></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>tipocomprovendo</ATTRID>
                <ATTRNAME><![CDATA[2190]]></ATTRNAME>
                <ATTRVAL></ATTRVAL>
              </ATTRIBUTE>
              <ATTRIBUTE>
                <ATTRID>prezzo</ATTRID>
                <ATTRNAME></ATTRNAME>
                <ATTRVAL><![CDATA[${generatePrice(item)}]]></ATTRVAL>
              </ATTRIBUTE>
              
              </ATTRIBUTELIST>
    
              
              <IMAGELIST>
    
              ${
                item.attributes.images && item.attributes.images.data.length
                  ? item.attributes.images.data
                      .map((x) => `<IMGFILE>${x.attributes.url}</IMGFILE>`)
                      .join("")
                  : ""
              }
               
              </IMAGELIST>
    
              
        </ITEM>`;
        }
      })
      .join("")}
    </ITEMLIST>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
        ${xmlFile}
    `;
}

function BakecaMap() {}

export async function getServerSideProps({ res }) {
  const { meta } = await getBakecaItems(1);

  /*   const allData = [...data]; */
  let promises = [];

  for (let i = 1; i < 6; i++) {
    promises = [...promises, i];
  }

  const result = await Promise.all(promises.map((x) => getBakecaItems(x)));
  const data = result.map(({ data }) => data).flat();

  /* console.log(test); */
  // We generate the XML sitemap with the posts data
  const bakeca = generateBakecaXml(data);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(bakeca);
  res.end();

  return {
    props: {},
  };
}

export default BakecaMap;
