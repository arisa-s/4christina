"use client";

import { useEffect, useState } from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { sanityCustomComponents } from "@/components/sanity/sanityCustomComponents";

const POST_QUERY = `*[_type == "poem" && slug.current == $slug][0]`;

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [poem, setpoem] = useState<SanityDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(POST_QUERY, { slug });
        setpoem(data);
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
    return <p>Loading...</p>;
  }

  if (error || !poem) {
    return <p>Post not found</p>;
  }

  return (
    <article className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <PortableText value={poem.body} components={sanityCustomComponents} />
    </article>
  );
}
