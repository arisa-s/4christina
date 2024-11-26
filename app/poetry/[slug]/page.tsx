import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { sanityCustomComponents } from "@/components/sanityCustomComponents";

const POST_QUERY = `*[_type == "poem" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const poem = await client.fetch<SanityDocument>(POST_QUERY, params, options);

  return (
    <article className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      {Array.isArray(poem.body) && (
        <PortableText value={poem.body} components={sanityCustomComponents} />
      )}
    </article>
  );
}
