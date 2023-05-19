import Link from "next/link";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";


export default function CookiesAllert({ className }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [cookiePolicy, setCookiePolicy] = useState(false);

  useEffect(() => {
    if (cookies.cookiesPolicy) setCookiePolicy(true);
  }, [cookies]);

  const setCookieHandler = () => {
    setCookie("cookiesPolicy", true, {
      path: "/",
      sameSite: "Strict"
    });
    setCookiePolicy(true)
  };

  return (
    <div
      className={
        cookiePolicy ? "hidden" : "fixed bottom-0 w-full flex justify-center"
      }
    >
      <div className="left-0 z-50  bg-white border-forest border  mb-4 mx-4 p-4 flex flex-col">
        <p>
          Noi e terze parti selezionate utilizziamo cookie o tecnologie simili
          per scopi tecnici e, con il vostro consenso, per altri scopi. Negare
          il consenso può rendere le funzionalità correlate non disponibili.
          Puoi dare, negare o revocare liberamente il tuo consenso in qualsiasi
          momento. Usa il pulsante Accetta per acconsentire.
        </p>
        <div className="flex justify-between items-end mt-2">
          <Link className="text-forest" href="/cookie-policy">
            Scopri di più
          </Link>
          <button
            onClick={setCookieHandler}
            className="p-2 bg-forest text-white rounded-sm"
          >
            ACCETTA
          </button>
        </div>
      </div>
    </div>
  );
}
