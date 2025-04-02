"use client";

import { BlogPage } from "@/components/shared/BlogPage";
import { getMiscProseBySlug } from "@/sanity/queries/miscProse";
import { use } from "react";

interface Params {
  slug: string;
}

export default function MiscProsePage({ params }: { params: Promise<Params> }) {
  const { slug } = use(params);
  return <BlogPage slug={slug} query={getMiscProseBySlug} />;
}
