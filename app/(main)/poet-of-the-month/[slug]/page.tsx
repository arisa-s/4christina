"use client";

import { BlogPage } from "@/components/shared/BlogPage";
import { getPoetOfTheMonthBySlug } from "@/sanity/queries/poetOfTheMonth";
import { use } from "react";

interface Params {
  slug: string;
}

export default function PoetOfTheMonthPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = use(params);
  return <BlogPage slug={slug} query={getPoetOfTheMonthBySlug} />;
}
