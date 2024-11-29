import { PortableTextReactComponents } from "@portabletext/react";

export const haikuComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <pre className="text-lg font-ebGaramond">{children}</pre>
    ),
  },
};
