"use client";

import { PortableTextReactComponents } from "@portabletext/react";
import dynamic from "next/dynamic";
import Paragraph from "../shared/Paragraph";
import Header from "../shared/Header";
import Link from "../shared/Link";
import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

// Supports PDF rendering
// The page needs to be client-side rendered

const PDFViewer = dynamic(
  () => import("../shared/PdfViewer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export const sanityBlogComponents: Partial<PortableTextReactComponents> = {
  types: {
    file: ({ value }: { value: { asset: { _ref: string } } }) => {
      // Extract the document ID from the _ref field
      const documentId = value.asset._ref
        .replace("file-", "")
        .replace("-pdf", "");
      const fileUrl = `https://cdn.sanity.io/files/9cledotx/production/${documentId}.pdf`;

      return <PDFViewer fileUrl={fileUrl} />;
    },
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
