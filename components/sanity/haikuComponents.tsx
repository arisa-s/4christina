import { PortableTextReactComponents } from "@portabletext/react";

export const haikuComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <pre className="md:text-xl font-ebGaramond">{children}</pre>
    ),
  },
};
