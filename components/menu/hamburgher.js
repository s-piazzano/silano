import { useState, useRef } from "react";
import { Bars2Icon } from "@heroicons/react/24/outline";
import Collapse from "../ui/Collapse";
import Link from "next/link";

export default function HamburgerMenu({ layout, test }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="inline">
      {/* HamburgerButton */}
      <button
        className=""
        aria-label="hamburger menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bars2Icon className="w-[42px] h-[42px]  text-stone-600 font-thin focus:outline-none" />
      </button>
      {/* menu container */}
      {isOpen && (
        <div className="fixed z-[1000] left-0 w-full h-screen bg-base-200 flex flex-col px-4 py-8 text-lg">
          {layout.map((x) => {
            /* Check DropdownMenu type */
            if (x.__typename === "ComponentDropdownMenu") {
              return (
                <Collapse key="x.id" title={x.name.toUpperCase()}>
                  <div className=" flex flex-col ">
                    {x.sections.map((section, index) => {
                      return (
                        <div key={index} className="pl-2 pt-2 text-black ">
                          <h2 className="">{section.title}</h2>
                          <div className="text-stone-600 flex flex-col space-y-2 mx-2 my-4">
                            {section.pages.data.map((page, index) => {
                              return (
                                <Link
                                  key={index}
                                  href={page.attributes.slug}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {page.attributes.title}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Collapse>
              );
            }
            if (x.__typename === "ComponentCommonLink")
              return (
                <Link
                  key={"link-" + x.id}
                  href={x.url}
                  alt=""
                  className="py-4 text-stone-600 uppercase font-extralight"
                >
                  {x.linkName}
                </Link>
              );
          })}
        </div>
      )}
    </div>
  );
}
