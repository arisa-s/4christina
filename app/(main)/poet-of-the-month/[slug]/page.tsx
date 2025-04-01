import { PortableText } from "next-sanity";
import { sanityBlogComponents } from "@/components/sanity/sanityBlogComponents";
import BlogContainer from "@/components/shared/BlogContainer";
import { sanityFetch } from "@/sanity/fetch";
import {
  getPoetOfTheMonthBySlug,
  listPoetOfTheMonthSlug,
} from "@/sanity/queries/poetOfTheMonth";

export default async function PoetPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const poetOfTheMonth = await sanityFetch({
    query: getPoetOfTheMonthBySlug,
    params: { slug },
  });

  if (!poetOfTheMonth) {
    return <div>Poet of the month not found</div>;
  }
  return (
    <BlogContainer>
      {poetOfTheMonth.body ? (
        <PortableText
          value={poetOfTheMonth.body}
          components={sanityBlogComponents}
        />
      ) : null}
    </BlogContainer>
  );
}

export async function generateStaticParams() {
  const poets = await sanityFetch({ query: listPoetOfTheMonthSlug });
  return poets.map((poet) => ({
    slug: poet.slug,
  }));
}
