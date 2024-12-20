import { PortableTextReactComponents } from "@portabletext/react";
import Paragraph from "../shared/Paragraph";
import Header from "../shared/Header";
import Link from "../shared/Link";
import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

// Supports PDF rendering
// The page needs to be client-side rendered

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export const sanityBlogComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value)?.url();
      return <img src={imageUrl} />;
    },
  },
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
