"use client";

import { useEffect, useState, use } from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { sanityBlogComponents } from "@/components/sanity/sanityBlogComponents";
import LoadingScreen from "@/components/shared/LoadingScreen";
import BlogContainer from "@/components/shared/BlogContainer";

const POST_QUERY = `*[_type == "poetOfTheMonth" && slug.current == $slug][0]`;

interface Params {
  slug: string;
}

export default function PostPage({ params }: { params: Params }) {
  const { slug } = use<Params>(params);
  const [poetOfTheMonth, setpoetOfTheMonth] = useState<SanityDocument | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(POST_QUERY, { slug });
        setpoetOfTheMonth(data);
      } catch (err) {
        console.error("Error fetching post data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !poetOfTheMonth) {
    return <p>Post not found</p>;
  }

  return (
    <BlogContainer>
      <PortableText
        value={poetOfTheMonth.body}
        components={sanityBlogComponents}
      />
    </BlogContainer>
  );
}
