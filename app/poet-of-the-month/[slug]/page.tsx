import { PortableText, type PortableTextBlock } from "next-sanity";
import { client } from "@/sanity/client";
import { sanityCustomComponents } from "@/components/sanity/sanityCustomComponents";

const POST_QUERY = `*[_type == "poetOfTheMonth" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

interface PoetOfTheMonthDocument {
  body: PortableTextBlock[]; // Adjust this type to match your schema
  slug: { current: string };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const poetOfTheMonth = await client.fetch<PoetOfTheMonthDocument>(
    POST_QUERY,
    { slug: params.slug }, // Ensure correct parameter passing
    options
  );

  if (!poetOfTheMonth) {
    return <p>Post not found</p>;
  }

  return (
    <article className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      {Array.isArray(poetOfTheMonth.body) && (
        <PortableText
          value={poetOfTheMonth.body}
          components={sanityCustomComponents}
        />
      )}
    </article>
  );
}

// Dynamic route metadata
export async function generateStaticParams() {
  // Fetch all slugs for the dynamic routes
  const slugs = await client.fetch<string[]>(
    `*[_type == "poetOfTheMonth"].slug.current`
  );

  return slugs.map((slug) => ({ slug }));
}
