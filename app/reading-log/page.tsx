import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import ConditionalWrap from "@/components/ConditionalWrap";

const POETS_QUERY = `*[
  _type == "readingLog"
]|order(publishedAt desc)`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

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

  return (
    <li>
      <ConditionalWrap
        condition={readingLog.slug}
        wrapper={(children) => (
          <Link href={`reading-log/${readingLog.slug.current}`}>
            {children}
          </Link>
        )}
      >
        <img src={readingLogImageUrl!} alt={readingLog.poet} />
      </ConditionalWrap>
    </li>
  );
};
