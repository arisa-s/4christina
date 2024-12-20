"use client";

import { useEffect, useState, use } from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import LoadingScreen from "@/components/shared/LoadingScreen";
import BlogContainer from "@/components/shared/BlogContainer";
import { sanityPoetryComponents } from "@/components/sanity/sanityPoetryComponent";

const POST_QUERY = `*[_type == "poem" && slug.current == $slug][0]`;

interface Params {
  slug: string;
}

export default function PostPage({ params }: { params: Params }) {
  const { slug } = use<Params>(params); // Strongly typed `use` function
  const [poem, setPoem] = useState<SanityDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(POST_QUERY, { slug });
        setPoem(data);
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

  if (error || !poem) {
    return <p>Post not found</p>;
  }

  return (
    <BlogContainer>
      <PortableText value={poem.body} components={sanityPoetryComponents} />
    </BlogContainer>
  );
}
