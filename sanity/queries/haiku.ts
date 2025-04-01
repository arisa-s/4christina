import { defineQuery } from "next-sanity";

export const listHaiku = defineQuery(`
    *[_type == "haiku"] | order(date desc)
  `);
