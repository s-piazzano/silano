"client only";
import styles from "./dropdown.module.css";
import Link from "next/link";

export default function DropdownMenu({ name, url, type, sections }) {
  return (
    <div className={styles.dropdown}>
      <Link
        href={url ? url : "#"}
        className="h-[74px] flex justify-center items-center px-4 text-lg font-extralight"
      >
        {name}
      </Link>
      <div className={styles.dropdownContent}>
        <div className="w-full flex space-x-12 md:px-16 md:py-8">
          {/* sections */}
          {sections.map((section, indexSection) => {
            return (
              <div
                key={"section-" + indexSection}
                className="flex flex-col text-lg capitalize"
              >
                <h2 className="text-black font-light  mb-4">
                  {section.title}
                </h2>
                {/* Links */}
                {section.pages.data.map((page, indexPage) => (
                  <Link
                    key={"page-" + indexPage}
                    href={"/" + page.attributes.slug}
                    className="font-extralight"
                  >
                    {page.attributes.title}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
