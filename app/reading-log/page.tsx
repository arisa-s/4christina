import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import ConditionalWrap from "@/components/ConditionalWrap";
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
  const readingLogImageUrl = readingLog.image
    ? urlFor(readingLog.image)?.width(300).height(400).url()
    : null;

  const {
    dimensions: { width, height },
  } = decodeAssetId(readingLog.image.asset._ref);

  return (
    <li>
      <ConditionalWrap
        condition={readingLog.slug}
        wrapper={(children) => (
          <Link
            href={`reading-log/${readingLog.slug.current}`}
            className="cursor-pointer"
          >
            {children}
          </Link>
        )}
      >
        <Image
          src={readingLogImageUrl!}
          alt={readingLog.poet}
          width={width}
          height={height}
        />
      </ConditionalWrap>
    </li>
  );
};
