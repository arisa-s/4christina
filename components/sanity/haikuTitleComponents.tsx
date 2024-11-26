import { PortableTextReactComponents } from "@portabletext/react";

export const haikuTitleComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <pre className="font-ebGaramond hover:text-red-900">{children}</pre>
    ),
  },
};
