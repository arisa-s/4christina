import { defineField, defineType } from "sanity";

export const miscProseType = defineType({
  name: "miscProse",
  title: "Misc Prose",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "tag",
      type: "string",
    }),
    defineField({
      name: "sumarry",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "body",
      title: "Body",
    }),
  ],
});
