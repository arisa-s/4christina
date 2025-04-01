import { defineQuery } from "next-sanity";

export const listPoetry = defineQuery(`
    *[_type == "poetry"] | order(publishedAt desc)
  `);

export const getPoetryBySlug = defineQuery(`
    *[_type == "poetry" && slug.current == $slug][0]
  `);

export const listPoetrySlug = defineQuery(`
    *[_type == "poetry"] {
        "slug": slug.current
    }
  `);
