import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { sanityFetch } from "@/sanity/fetch";
import { listReadingLog } from "@/sanity/queries/readingLog";
import { DimensionAdjustedImage } from "@/components/shared/DimensionAdjustedImage";
import { FadeInView } from "@/components/shared/FadeInView";

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
    <DimensionAdjustedImage
      image={readingLog.image}
      alt={readingLog.title || "book cover"}
      className="w-full h-full object-cover"
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
