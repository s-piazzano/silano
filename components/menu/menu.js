import Link from "next/link";
import DropdownMenu from "./dropdown";

export default function Menu({ layout }) {
  return (
    <div className="hidden w-full h-[74px] md:flex text-stone-900 font-light uppercase text-sm tracking-widest">
      {layout.map((x) => {
        /* Dropdown Menu */
        if (x.__typename === "ComponentDropdownMenu")
          return (
            <DropdownMenu
              key={x.id}
              name={x.name}
              url={x.url}
              type={x.type}
              sections={x.sections}
            />
          );
        if (x.__typename === "ComponentCommonLink")
          return (
            <Link
              key={"link-" + x.id}
              href={x.url}
              alt=""
              className="flex items-center justify-center px-4"
            >
              {x.linkName}
            </Link>
          );
      })}
    </div>
  );
}
