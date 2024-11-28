"use client";

import { FC, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export interface PDFViewerProps {
  fileUrl: string;
}

export const PDFViewer: FC<PDFViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(5);
  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function onPageLoadSuccess(pdfPage: any): void {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const viewport = pdfPage.getViewport({ scale: 1 });
      const calculatedScale = containerWidth / viewport.width;
      setScale(calculatedScale);
    }
  }

  return (
    <div ref={containerRef} style={{ width: "100%", overflow: "auto" }}>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          onLoadSuccess={onPageLoadSuccess}
          scale={scale}
        />
      </Document>
    </div>
  );
};

export default PDFViewer;
