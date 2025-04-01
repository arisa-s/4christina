import { defineQuery } from "next-sanity";

export const listPoetOfTheMonth = defineQuery(`
    *[_type == "poetOfTheMonth"] | order(publishedAt desc)
  `);

export const getPoetOfTheMonthBySlug = defineQuery(`
    *[_type == "poetOfTheMonth" && slug.current == $slug][0]
  `);

export const listPoetOfTheMonthSlug = defineQuery(`
    *[_type == "poetOfTheMonth"] {
        "slug": slug.current
    }
  `);
