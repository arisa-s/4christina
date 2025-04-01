import {defineField, defineType} from 'sanity'

export const haikuType = defineType({
  name: 'haiku',
  title: 'Haiku',
  type: 'document',
  fields: [
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: "body",
        type: "array",
        title: "Body",
        of: [
          {
            type: "block",
          },
        ],
      },),
  ],
})