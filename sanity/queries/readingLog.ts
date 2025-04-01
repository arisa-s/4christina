import { defineQuery } from "next-sanity";

export const listReadingLog = defineQuery(`
    *[_type == "readingLog"] | order(publishedAt desc)
  `);

export const getReadingLogBySlug = defineQuery(`
    *[_type == "readingLog" && slug.current == $slug][0]
  `);

export const listReadingLogSlug = defineQuery(`
    *[_type == "readingLog"] {
        "slug": slug.current
    }
  `);
