import { PortableTextReactComponents } from "@portabletext/react";

export const haikuComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <pre className="">{children}</pre>,
  },
};
