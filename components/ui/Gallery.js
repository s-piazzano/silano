import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images }) {
  const [imageUrl, setImageUrl] = useState(images.data[0].attributes.url);

  return (
    <div className="flex flex-col w-full md:w-1/2 lg:w-[500px]">
      <Image
        src={imageUrl}
        alt="Picture of the author"
        width={500}
        height={300}
      />
      <div className="flex pt-2 overflow-y-auto">
        {images.data.map((x) => {
          return (
            <div
              key={x.id}
              className="cursor-pointer pr-2"
              onClick={() => setImageUrl(x.attributes.formats.small.url)}
            >
              <Image
                src={x.attributes.formats.small.url}
                alt="Picture of the author"
                width={100}
                height={45}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}