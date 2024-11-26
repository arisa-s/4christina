import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { AutoplayVideo } from "@/components/AutoplayVideo";

const INSPIRATIONS_QUERY = `*[_type == "inspiration"] | order(publishedAt desc) {
  _id,
  title,
  mediaType,
  "mediaUrl": media.asset->url,
  publishedAt
}`;

// ISR configuration
const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  // Fetch inspirations data from Sanity
  const inspirations = await client.fetch<SanityDocument[]>(
    INSPIRATIONS_QUERY,
    {},
    options
  );

  return (
    <div className="columns-3 gap-4 space-y-6">
      {inspirations.map((inspiration) => (
        <InspirationCard key={inspiration._id} inspiration={inspiration} />
      ))}
    </div>
  );
}

const InspirationCard = ({ inspiration }: { inspiration: SanityDocument }) => {
  const { title, mediaType, mediaUrl } = inspiration;

  return (
    <div className="relative">
      {mediaType === "image" && mediaUrl && (
        <img
          src={mediaUrl}
          alt={title || "Inspiration media"}
          className="w-full h-auto"
        />
      )}
      {mediaType === "video" && mediaUrl && (
        <AutoplayVideo src={mediaUrl} className="w-full h-auto" />
      )}
    </div>
  );
};
