import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";
import imageUrlBuilder from "@sanity/image-url";

const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/;

export const decodeAssetId = (id: string) => {
  // @ts-ignore
  const [, assetId, dimensions, format] = pattern.exec(id);
  const [width, height] = dimensions
    .split("x")
    .map((v: string) => parseInt(v, 10));

  return {
    assetId,
    dimensions: { width, height },
    format,
  };
};

export const urlFor = (source: SanityImageSource) => {
  const { projectId, dataset } = client.config();
  return projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
};
