import { defineQuery } from "next-sanity";

// !!!! poetry keyword is used in frontend but it's actually a poem !!!!
export const listPoetry = defineQuery(`
    *[_type == "poem"] | order(publishedAt desc)
  `);

export const getPoetryBySlug = defineQuery(`
    *[_type == "poem" && slug.current == $slug][0]
  `);

export const listPoetrySlug = defineQuery(`
    *[_type == "poem"] {
        "slug": slug.current
    }
  `);
