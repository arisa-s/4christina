import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import Image from "next/image";
import { decodeAssetId, urlFor } from "@/sanity/image";

const POETS_QUERY = `*[
  _type == "readingLog"
]|order(publishedAt desc)`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const readingLogs = await client.fetch<SanityDocument[]>(
    POETS_QUERY,
    {},
    options
  );

  return (
    <div className="mx-auto md:pt-6 lg:pt-12">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {readingLogs.map((readingLog) => (
          <BookCard readingLog={readingLog} key={readingLog._id} />
        ))}
      </ul>
    </div>
  );
}

const BookCard = ({ readingLog }: { readingLog: SanityDocument }) => {
  const getImageUrl = () => {
    if (!readingLog.image) return null;
    try {
      return urlFor(readingLog.image)?.width(300).height(400).url();
    } catch (error) {
      console.error(error);
      console.log(readingLog);
      return null;
    }
  };
  const readingLogImageUrl = getImageUrl();

  const {
    dimensions: { width, height },
  } = readingLogImageUrl
    ? decodeAssetId(readingLog.image.asset._ref)
    : { dimensions: { width: 0, height: 0 } };

  const imageElement = (
    <Image
      src={readingLogImageUrl!}
      width={width}
      height={height}
      alt={readingLog.title || "book cover"}
    />
  );

  if (!readingLog.slug) return imageElement;

  return (
    <li>
      <Link
        href={`reading-log/${readingLog.slug.current}`}
        className="cursor-pointer"
      >
        {imageElement}
      </Link>
    </li>
  );
};
