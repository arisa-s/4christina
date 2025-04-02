"use client";

import { useEffect, useState, use } from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import LoadingScreen from "@/components/shared/LoadingScreen";
import BlogContainer from "@/components/shared/BlogContainer";
import { sanityFetch } from "@/sanity/fetch";
import { sanityBlogComponents } from "../sanity/sanityBlogComponent";

interface BlogPageProps {
  slug: string;
  query: string;
  title?: string;
}

export function BlogPage({ slug, query, title }: BlogPageProps) {
  const [content, setContent] = useState<SanityDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sanityFetch({
          query,
          params: { slug },
        });
        if (!data) {
          setError("Content not found");
          return;
        }
        setContent(data);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, query]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Error</h1>
          <p className="text-gray-600">{error || "Content not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <BlogContainer>
      <article className="prose prose-lg max-w-none">
        {title && <h1 className="text-3xl font-bold mb-4">{title}</h1>}
        <PortableText value={content.body} components={sanityBlogComponents} />
      </article>
    </BlogContainer>
  );
}
