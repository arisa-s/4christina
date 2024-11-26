import { PortableTextReactComponents } from "@portabletext/react";

export const haikuComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg font-ebGaramond">{children}</p>
    ),
  },
};
