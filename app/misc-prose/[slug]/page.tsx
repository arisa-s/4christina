import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const POST_QUERY = `*[_type == "miscProse" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const miscProse = await client.fetch<SanityDocument>(
    POST_QUERY,
    params,
    options
  );

  if (!miscProse) {
    return <p>Post not found</p>;
  }

  return (
    <article className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <PortableText
        value={miscProse.body}
        components={sanityCustomComponents}
      />
    </article>
  );
}
import React from "react";

export const sanityCustomComponents = {
  types: {
    file: ({ value }: { value: any }) => {
      if (value?.asset?._ref) {
        const fileUrl = `https://cdn.sanity.io/files/${
          process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        }/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${
          value.asset._ref.split("-")[1]
        }.${value.asset._ref.split("-")[2]}`;
        return (
          <div className="pdf-viewer my-4">
            <iframe
              src={fileUrl}
              width="100%"
              height="600px"
              className="border rounded"
            >
              Your browser does not support iframes. Please download the file
              <a href={fileUrl}>here</a>.
            </iframe>
          </div>
        );
      }
      return null;
    },
    image: ({ value }: { value: any }) => {
      return (
        <img
          src={value.asset.url}
          alt={value.alt || "Image"}
          className="my-4 w-full rounded"
        />
      );
    },
  },
};
