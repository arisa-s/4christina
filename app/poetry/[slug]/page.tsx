import { PortableText, type PortableTextBlock } from "next-sanity";
import { client } from "@/sanity/client";
import { sanityCustomComponents } from "@/components/sanity/sanityCustomComponents";

const POST_QUERY = `*[_type == "poem" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

interface PoemDocument {
  body: PortableTextBlock[]; // Adjust this type to match your schema
  slug: { current: string };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const poem = await client.fetch<PoemDocument>(
    POST_QUERY,
    { slug: params.slug }, // Pass slug correctly as an object
    options
  );

  if (!poem) {
    return <p>Post not found</p>; // Handle the case where the poem does not exist
  }

  return (
    <article className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      {Array.isArray(poem.body) && (
        <PortableText value={poem.body} components={sanityCustomComponents} />
      )}
    </article>
  );
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(`*[_type == "poem"].slug.current`);

  return slugs.map((slug) => ({ slug }));
}
