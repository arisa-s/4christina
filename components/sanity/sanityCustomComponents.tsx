"use client";

import { PortableTextReactComponents } from "@portabletext/react";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("../PdfViewer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

export const sanityCustomComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string } } }) => {
      // const imageUrl = client.getImageUrl(value);
      // return <img src={imageUrl} alt="Image" className="my-4 w-full" />;
      return null;
    },
    file: ({ value }: { value: { asset: { _ref: string } } }) => {
      // Extract the document ID from the _ref field
      const documentId = value.asset._ref
        .replace("file-", "")
        .replace("-pdf", "");
      const fileUrl = `https://cdn.sanity.io/files/9cledotx/production/${documentId}.pdf`;

      return <PDFViewer fileUrl={fileUrl} />;
    },
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
