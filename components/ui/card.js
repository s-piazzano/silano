import Image from "next/image";
import Link from "next/link";

export default function Card({
  id,
  className = "",
  imageUrl = "https://silano-3r.fra1.digitaloceanspaces.com/3r/eb7b1453f0328c5136fe884112e2b89c.jpg?updated_at=2023-02-16T10:32:29.892Z",
  title,
  description,
  link,
}) {
  return (
    <div
      id={id}
      className={`bg-neutral-100 w-full md:max-w-sm  rounded overflow-hidden shadow-lg flex flex-col ${className} `}
    >
      <Image
        className="w-full"
        src={imageUrl}
        width={600}
        height={400}
        alt="image-card"
      />

      <div className="px-1 lg:px-6 py-4 grow">
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
