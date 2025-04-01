import { AutoplayVideo } from "@/components/shared/AutoplayVideo";
import { sanityFetch } from "@/sanity/fetch";
import { listInspirations } from "@/sanity/queries/inspiration";
import { DimensionAdjustedImage } from "@/components/shared/DimensionAdjustedImage";
import { getFileAsset } from "@sanity/asset-utils";
import { client } from "@/sanity/lib/client";

export default async function IndexPage() {
  // Fetch inspirations data from Sanity
  const inspirations = await sanityFetch({
    query: listInspirations,
  });

  return (
    <div className="columns-2 md:columns-3 gap-2 md:gap-4 space-y-2 md:space-y-4">
      {inspirations.map((inspiration) => {
        if (inspiration.mediaType === "image" && inspiration.image) {
          return (
            <DimensionAdjustedImage
              image={inspiration.image}
              alt={inspiration.title || "Inspiration media"}
              className="w-full h-auto"
              key={inspiration._id}
            />
          );
        }
        if (inspiration.mediaType === "video" && inspiration.video?.asset) {
          const videoUrl = getFileAsset(
            inspiration.video.asset,
            client.config()
          ).url;

          return (
            <AutoplayVideo
              src={videoUrl}
              className="w-full h-auto"
              key={inspiration._id}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
