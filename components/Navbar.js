import Link from "next/link";

import Image from "next/image";
import Menu from "./menu/menu";
import HamburgerMenu from "./menu/hamburgher";

export default function Navbar({ imageUrl, hours, contact, layout }) {
  return (
    <div className="w-full fixed z-50 top-0 left-0 ">
      {/* Banner */}
      <div className=" w-full h-[32px] flex px-4 md:px-16 bg-forest justify-center md:justify-between items-center text-white text-sm font-thin">
        <h6 className="hidden md:block">{hours}</h6>
        <div className="flex divide-x">
          <a
            target="_blank"
            rel="noreferrer"
            className="px-2"
            href="tel:+390161930380"
          >
            Tel: 0161 930380
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="px-2"
            href="https://wa.me/+393929898074"
          >
            Whatsapp: 392 989 8074
          </a>
        </div>
      </div>
      <div className="relative w-full h-[74px] bg-base-200 border-b border-gray-200 px-4 md:px-16 flex  justify-between items-center ">
        <Link href="/">
          <Image
            className="w-[45px] h-[45px] mr-6 -ml-1"
            src={imageUrl}
            width={96}
            height={96}
            quality={100}
            alt="logo"
          />
        </Link>
        <Menu layout={layout} />
        <div className="block md:hidden">
          <HamburgerMenu layout={layout} />
        </div>
      </div>
    </div>
  );
}
