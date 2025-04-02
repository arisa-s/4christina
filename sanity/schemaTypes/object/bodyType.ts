import { defineType } from "sanity";

export const bodyType = defineType({
  name: "body",
  type: "array",
  title: "Body",
  of: [
    {
      type: "block",
    },
    {
      type: "image",
      options: { hotspot: true },
    },
    {
      type: "file",
      title: "PDF",
      options: {
        accept: "application/pdf",
      },
    },
  ],
});
