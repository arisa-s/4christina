import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { sanityFetch } from "@/sanity/fetch";
import { listReadingLog } from "@/sanity/queries/readingLog";
import { FadeInView } from "@/components/shared/FadeInView";
import { Image } from "next-sanity/image";
import { urlFor } from "@/sanity/lib/image";

export default async function IndexPage() {
  const readingLogs = await sanityFetch({ query: listReadingLog });

  return (
    <div className="mx-auto md:pt-6 lg:pt-12">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {readingLogs.map((readingLog) => (
          <FadeInView key={readingLog._id}>
            <BookCard readingLog={readingLog} key={readingLog._id} />
          </FadeInView>
        ))}
      </ul>
    </div>
  );
}

const BookCard = ({ readingLog }: { readingLog: SanityDocument }) => {
  const imageElement = readingLog.image ? (
    <Image
      src={urlFor(readingLog.image)!.url()}
      alt={readingLog.title || "book cover"}
      className="w-full h-full object-cover"
      width={300}
      height={450}
    />
  ) : (
    <div>{readingLog.title}</div>
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
