import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import CardHeader from "@/components/shared/CardHeader";
import CardTag from "@/components/shared/CardTag";
import Paragraph from "@/components/shared/Paragraph";
import Image from "next/image";
import { decodeAssetId } from "@/sanity/image";

const MISCS_QUERY = `*[
  _type == "miscProse"
  && defined(slug.current)
]|order(publishedAt desc)`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const miscProses = await client.fetch<SanityDocument[]>(
    MISCS_QUERY,
    {},
    options
  );

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 md:pt-6 lg:pt-12">
      {miscProses.map((miscProse) => (
        <PostCard miscProse={miscProse} key={miscProse._id} />
      ))}
    </ul>
  );
}

const PostCard = ({ miscProse }: { miscProse: SanityDocument }) => {
  const miscProseImageUrl = miscProse.image
    ? urlFor(miscProse.image)?.url()
    : null;

  const {
    dimensions: { width, height },
  } = decodeAssetId(miscProse.image.asset._ref);

  return (
    <li>
      <Link href={`/misc-prose/${miscProse.slug.current}`}>
        <div className="space-y-2">
          {miscProseImageUrl && (
            <Image
              src={miscProseImageUrl}
              alt={miscProse.poet}
              className="w-full"
              width={width}
              height={height}
            />
          )}
          <div>
            {miscProse.title && <CardTag>{miscProse.tag}</CardTag>}
            <CardHeader>{miscProse.title}</CardHeader>
            {miscProse.tag && (
              <Paragraph type="secondary">{miscProse.summary}</Paragraph>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};
