import { defineQuery } from "next-sanity";

export const listMiscProse = defineQuery(`
    *[_type == "miscProse"] | order(date asc)
  `);

export const getMiscProseBySlug = defineQuery(`
    *[_type == "miscProse" && slug.current == $slug][0]
  `);

export const listMiscProseSlug = defineQuery(`
    *[_type == "miscProse"] {
        "slug": slug.current
    }
  `);
