import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import ConditionalWrap from "@/components/ConditionalWrap";

const POETS_QUERY = `*[
  _type == "readingLog" && defined(slug.current)
] | order(publishedAt desc)`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

interface ReadingLog extends SanityDocument {
  slug: { current: string };
  poet: string;
  image?: SanityImageSource;
}

export default async function IndexPage() {
  const readingLogs = await client.fetch<ReadingLog[]>(
    POETS_QUERY,
    {},
    options
  );

  if (!readingLogs || readingLogs.length === 0) {
    return <p>No reading logs found.</p>;
  }

  return (
    <div>
      <ul className="grid grid-cols-6 gap-4">
        {readingLogs.map((readingLog) => (
          <BookCard readingLog={readingLog} key={readingLog._id} />
        ))}
      </ul>
    </div>
  );
}

const BookCard = ({ readingLog }: { readingLog: ReadingLog }) => {
  const readingLogImageUrl = readingLog.image
    ? urlFor(readingLog.image)?.width(150).height(200).url()
    : null;

  return (
    <li>
      <ConditionalWrap
        condition={!!readingLog.slug.current}
        wrapper={(children) => (
          <Link href={`/poet-of-the-month/${readingLog.slug.current}`}>
            {children}
          </Link>
        )}
      >
        {readingLogImageUrl ? (
          <img
            src={readingLogImageUrl}
            alt={readingLog.poet}
            width="150"
            height="300"
            className="object-cover"
          />
        ) : (
          <div className="w-[150px] h-[300px] bg-gray-200 flex items-center justify-center text-sm">
            No Image
          </div>
        )}
      </ConditionalWrap>
    </li>
  );
};
