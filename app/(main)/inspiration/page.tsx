import { AutoplayVideo } from "@/components/shared/AutoplayVideo";
import { sanityFetch } from "@/sanity/fetch";
import { listInspirations } from "@/sanity/queries/inspiration";
import { DimensionAdjustedImage } from "@/components/shared/DimensionAdjustedImage";
import { getFileAsset } from "@sanity/asset-utils";
import { client } from "@/sanity/lib/client";
import { FadeInView } from "@/components/shared/FadeInView";
import { LoadingOverlay } from "@/components/home/LoadingOverlay";

export default async function IndexPage() {
  // Fetch inspirations data from Sanity
  const inspirations = await sanityFetch({
    query: listInspirations,
  });

  return (
    <div className="columns-2 md:columns-3 gap-2 md:gap-4 space-y-2 md:space-y-4">
      <LoadingOverlay overlayKey="inspiration" />
      {inspirations.map((inspiration) => {
        if (inspiration.mediaType === "image" && inspiration.image) {
          return (
            <FadeInView key={inspiration._id}>
              <DimensionAdjustedImage
                image={inspiration.image}
                alt={inspiration.title || "Inspiration media"}
                className="w-full h-auto"
                key={inspiration._id}
              />
            </FadeInView>
          );
        }
        if (inspiration.mediaType === "video" && inspiration.video?.asset) {
          const videoUrl = getFileAsset(
            inspiration.video.asset,
            client.config()
          ).url;

          return (
            <FadeInView key={inspiration._id}>
              <AutoplayVideo
                src={videoUrl}
                className="w-full h-auto"
                key={inspiration._id}
              />
            </FadeInView>
          );
        }
        return null;
      })}
    </div>
  );
}
