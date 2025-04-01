import { defineQuery } from "next-sanity";

export const listInspirations = defineQuery(`
    *[_type == "inspiration"] | order(publishedAt desc)
  `);
