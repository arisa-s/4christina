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
      <PortableText value={miscProse.body} />
    </article>
  );
}
