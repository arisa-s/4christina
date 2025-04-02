import { defineField, defineType } from "sanity";

export const readingLogType = defineType({
  name: "readingLog",
  title: "Reading log",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "author",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "memo",
      type: "body",
      title: "Memo",
    }),
  ],
});
