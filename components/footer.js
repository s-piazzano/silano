import { Remark } from "react-remark";

import Link from "next/link";

export default function Footer({ layout }) {
  return (
    <div className="flex flex-col bg-base-200">
      <div className="w-full  mt-8 px-4 md:px-16 py-8 flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
        {layout.map((x) => {
          if (x.__typename === "ComponentFooterCard") {
            return (
              <div key={x.id} className="flex flex-col">
                <h2>{x.name}</h2>
                <Remark className="mt-4 text-sm">{x.description}</Remark>
              </div>
            );
          }
          if (x.__typename === "ComponentMenuSection") {
            return (
              <div key={x.id} className="flex flex-col space-y-2">
                <h2 className="mb-2">{x.name}</h2>
                {x.links.map((link, index) => {
                  return (
                    <Link key={index} href={link.url}>
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            );
          }
        })}
      </div>
      <div className="w-full h-8 text-center text-sm border-t flex items-center justify-center">
        Copyright {new Date().getFullYear()}
      </div>
    </div>
  );
}
