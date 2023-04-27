import Navbar from "../Navbar";
import Footer from "../footer";
export default function Default({ children, menu, footerLayout }) {
  console.log("rw" +menu.imageUrl)
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
    </div>
  );

}
