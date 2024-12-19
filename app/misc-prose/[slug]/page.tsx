import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { sanityBlogComponents } from "@/components/sanity/sanityBlogComponents";
import BlogContainer from "@/components/shared/BlogContainer";

const POST_QUERY = `*[_type == "miscProse" && slug.current == $slug][0]`;
const POST_SLUGS_QUERY = `*[
  _type == "miscProse" && defined(slug.current)
]|order(publishedAt desc){_id, slug}`;

interface Params {
  slug: string;
}

// export async function generateStaticParams() {
//   const posts = await client.fetch(POST_SLUGS_QUERY);
//   return posts.map((post: SanityDocument) => ({
//     slug: post.slug.current,
//   }));
// }

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const miscProse = await client.fetch(POST_QUERY, { slug });

  return (
    <BlogContainer>
      <PortableText value={miscProse.body} components={sanityBlogComponents} />
    </BlogContainer>
  );
}
