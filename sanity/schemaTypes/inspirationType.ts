import { defineField, defineType } from "sanity";

export const inspirationType = defineType({
  name: "inspiration",
  title: "Inspiration",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "video",
      type: "file",
      title: "Video",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value?.mediaType) {
        return "Please select a media type";
      }
      if (value.mediaType === "image" && !value.image) {
        return "Please select an image when media type is Image";
      }
      if (value.mediaType === "video" && !value.video) {
        return "Please select a video when media type is Video";
      }
      return true;
    }),
});
