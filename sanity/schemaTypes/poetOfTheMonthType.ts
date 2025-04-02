import { defineField, defineType } from "sanity";

export const poetOfTheMonthType = defineType({
  name: "poetOfTheMonth",
  title: "Poet of the Month",
  type: "document",
  fields: [
    defineField({
      name: "poet",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "month",
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
      name: "image",
      type: "image",
    }),
    defineField({
      name: "body",
      type: "body",
      title: "Body",
    }),
  ],
});
