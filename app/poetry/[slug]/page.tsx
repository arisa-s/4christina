"use client";

import { useEffect, useState, use } from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { sanityBlogComponents } from "@/components/sanity/sanityBlogComponents";
import LoadingScreen from "@/components/shared/LoadingScreen";

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
    <article className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <PortableText value={poem.body} components={sanityBlogComponents} />
    </article>
  );
}
