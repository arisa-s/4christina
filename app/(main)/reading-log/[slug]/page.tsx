import { PortableText } from "next-sanity";
import { sanityBlogComponents } from "@/components/sanity/sanityBlogComponents";
import BlogContainer from "@/components/shared/BlogContainer";
import { sanityFetch } from "@/sanity/fetch";
import {
  getReadingLogBySlug,
  listReadingLogSlug,
} from "@/sanity/queries/readingLog";

interface Params {
  slug: string;
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const readingLog = await sanityFetch({
    query: getReadingLogBySlug,
    params: { slug },
  });

  if (!readingLog) {
    return <div>Reading log not found</div>;
  }

  return (
    <BlogContainer>
      {readingLog.memo ? (
        <PortableText
          value={readingLog.memo}
          components={sanityBlogComponents}
        />
      ) : null}
    </BlogContainer>
  );
}

export async function generateStaticParams() {
  const readingLogs = await sanityFetch({ query: listReadingLogSlug });
  return readingLogs.map((readingLog) => ({
    slug: readingLog.slug,
  }));
}
