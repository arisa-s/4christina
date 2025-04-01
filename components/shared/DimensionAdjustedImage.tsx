import { decodeAssetId, urlFor } from "@/sanity/lib/image";
import { SanityImage } from "@/sanity/lib/type";
import { Image } from "next-sanity/image";

export const DimensionAdjustedImage = ({
  image,
  alt,
  className,
}: {
  image: SanityImage;
  alt: string;
  className?: string;
}) => {
  if (!image.asset) {
    return null;
  }
  const miscProseImageUrl = urlFor(image)!.url();
  const {
    dimensions: { width, height },
  } = decodeAssetId(image.asset._ref);
  return (
    <Image
      src={miscProseImageUrl}
      className={`${className} w-full`}
      width={width}
      height={height}
      alt={alt}
    />
  );
};
