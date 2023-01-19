import Image from "next/image";
import Link from "next/link";

export default function Card({
  id,
  className = "",
  imageUrl,
  title,
  description,
  link,
}) {
  return (
    <div
      id={id}
      className={`bg-neutral-100 w-full md:max-w-sm  rounded overflow-hidden shadow-lg flex-1 ${className}`}
    >
      <Image
        className="w-full"
        src={imageUrl}
        width={600}
        height={400}
        alt="image-card"
      />

      <div className="h-40 px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link href={link.url} className="inline-block font-semibold">
          {link.name}
        </Link>
      </div>
    </div>
  );
}
