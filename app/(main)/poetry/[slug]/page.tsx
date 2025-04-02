"use client";

import { BlogPage } from "@/components/shared/BlogPage";
import { getPoetryBySlug } from "@/sanity/queries/poetry";
import { use } from "react";

interface Params {
  slug: string;
}

export default function PoetryPage({ params }: { params: Promise<Params> }) {
  const { slug } = use(params);
  return <BlogPage slug={slug} query={getPoetryBySlug} />;
}
