import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

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
    <div>
      <ul className="grid grid-cols-6 gap-4">
        {miscProses.map((miscProse) => (
          <PostCard miscProse={miscProse} key={miscProse._id} />
        ))}
      </ul>
    </div>
  );
}

const PostCard = ({ miscProse }: { miscProse: SanityDocument }) => {
  const miscProseImageUrl = miscProse.image
    ? urlFor(miscProse.image)?.url()
    : null;

  return (
    <li>
      <Link href={`poet-of-the-month/${miscProse.slug.current}`}>
        <div className="space-y-2">
          {miscProseImageUrl && (
            <img src={miscProseImageUrl} alt={miscProse.poet} />
          )}
          <div>
            {miscProse.title && (
              <p className="text-sm text-secondary">{miscProse.tag}</p>
            )}
            <h2 className="font-medium">{miscProse.title}</h2>
            {miscProse.tag && (
              <p className="text-base text-primary">{miscProse.summary}</p>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};
