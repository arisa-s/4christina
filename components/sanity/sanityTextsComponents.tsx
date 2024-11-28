import { PortableTextReactComponents } from "@portabletext/react";
import Paragraph from "../shared/Paragraph";
import Header from "../shared/Header";
import Link from "../shared/Link";

export const sanityTextsComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ children, value }) => (
      <Link href={value.href} className="underline">
        {children}
      </Link>
    ),
  },
  block: {
    normal: ({ children }) => <Paragraph type="primary">{children}</Paragraph>,
    h1: ({ children }) => <Header type="1">{children}</Header>,
    h2: ({ children }) => <Header type="2">{children}</Header>,
    h3: ({ children }) => <Header type="3">{children}</Header>,
  },
};
