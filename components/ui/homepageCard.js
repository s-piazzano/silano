import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import anime from "animejs";

export default function HomepageCard({
  id,
  className = "",
  imageUrl,
  title,
  description,
  link,
}) {
  const mouseOver = (set) => {
    if (set) {
    }
  };

  const tl = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    tl.current = anime.timeline({
      autoplay: false,
      easing: "easeInOutSine",
    });

    tl.current.add({
      targets: titleRef.current,
      translateY: -100,
      duration: 4000,
    });
  });

  return (
    <div
      id={id}
      className={`w-full md:max-w-sm  rounded overflow-hidden shadow-lg flex-1 ${className}`}
      onMouseEnter={() => mouseOver(true)}
      onMouseLeave={() => mouseOver(false)}
    >
      <Image
        className="w-full"
        src={imageUrl}
        width={600}
        height={400}
        alt="image-card"
      />

      <div className="h-40 px-6 py-4">
        <div id="cardTitle" className="font-bold text-xl mb-2" ref={titleRef}>
          {title}
        </div>
        <p className="text-gray-700 text-base hidden">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {/*   <Link
          href={link.url}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          {link.name}
        </Link> */}
      </div>
    </div>
  );
}
