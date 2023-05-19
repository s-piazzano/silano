import { cookies } from "next/headers";

import Navbar from "../Navbar";
import Footer from "../footer";
import CookiesAllert from "../custom/cookiesAllert";

export default function Default({ children, menu, footerLayout }) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar
        imageUrl={menu.imageUrl}
        hours={menu.hours}
        contact={menu.contact}
        layout={menu.layout}
      />
      <div className="w-full mt-[106px] grow">{children}</div>
      <Footer layout={footerLayout} />
      <CookiesAllert></CookiesAllert>
    </div>
  );
}
