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
    { slug: params.slug }, // Ensure the slug is passed correctly
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

// Dynamic route metadata
export async function generateStaticParams() {
  // Example query to fetch all slugs for this dynamic route
  const slugs = await client.fetch(`*[_type == "miscProse"].slug.current`);

  return slugs.map((slug: string) => ({ slug }));
}
