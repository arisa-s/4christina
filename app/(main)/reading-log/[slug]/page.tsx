"use client";

import { BlogPage } from "@/components/shared/BlogPage";
import { getReadingLogBySlug } from "@/sanity/queries/readingLog";
import { use } from "react";
interface Params {
  slug: string;
}

export default function ReadingLogPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = use(params);
  return <BlogPage slug={slug} query={getReadingLogBySlug} />;
}
