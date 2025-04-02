import { defineQuery } from "next-sanity";

export const listReadingLog = defineQuery(`
    *[_type == "readingLog"] | order(publishedAt asc)
  `);

export const getReadingLogBySlug = defineQuery(`
    *[_type == "readingLog" && slug.current == $slug][0]
  `);

export const listReadingLogSlug = defineQuery(`
    *[_type == "readingLog" && defined(slug.current)] {
        "slug": slug.current
    }
  `);
