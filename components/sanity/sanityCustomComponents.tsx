import { PortableTextReactComponents } from "@portabletext/react";

export const sanityCustomComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => (
      <img src={value.asset.url} alt={value.alt || "Image"} />
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {children}
      </a>
    ),
  },
  block: {
    normal: ({ children }) => <p className="mb-3 text-primary">{children}</p>,
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold my-3">{children}</h2>
    ),
  },
};
