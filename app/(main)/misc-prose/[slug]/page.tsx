import { PortableText } from "next-sanity";
import { sanityBlogComponents } from "@/components/sanity/sanityBlogComponents";
import BlogContainer from "@/components/shared/BlogContainer";
import {
  getMiscProseBySlug,
  listMiscProseSlug,
} from "@/sanity/queries/miscProse";
import { sanityFetch } from "@/sanity/fetch";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch({ query: listMiscProseSlug });
  return slugs.map((slug) => ({
    slug: slug.slug,
  }));
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const miscProse = await sanityFetch({
    query: getMiscProseBySlug,
    params: { slug },
  });

  if (!miscProse) {
    // TODO: add a 404 page
    return <div>Misc prose not found</div>;
  }

  return (
    <BlogContainer>
      {miscProse.body ? (
        <PortableText
          value={miscProse.body}
          components={sanityBlogComponents}
        />
      ) : null}
    </BlogContainer>
  );
}
