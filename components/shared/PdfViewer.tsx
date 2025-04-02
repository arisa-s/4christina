"use client";

import { FC, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import LoadingScreen from "./LoadingScreen";
import { useSsrSafeResponsive } from "@/util/useResponsive";
export interface PDFViewerProps {
  fileUrl: string;
}
if (typeof Promise.withResolvers === "undefined") {
  if (window)
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const PDFViewer: FC<PDFViewerProps> = ({ fileUrl }) => {
  const window = useSsrSafeResponsive();

  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    if (window) {
      if (window["lg"]) {
        setScale(1);
      } else if (window["md"]) {
        setScale(0.8);
      } else {
        setScale(0.5);
      }
    }
  }, [window]);

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.25, 3.0)); // Limit zoom to 3x
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.25, 0.5)); // Limit zoom to 0.5x
  };

  return (
    <section
      id="pdf-section"
      className="d-flex flex-column align-items-center justify-items-center w-100"
    >
      <div className={`flex mb-4 py-2 px-6 rounded-full bg-secondary-bg`}>
        <div className="flex space-x-6 mx-auto">
          <button
            onClick={goToPreviousPage}
            className="cursor-pointer"
            disabled={isFirstPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down text-stone-500 hover:text-stone-900"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
          <label className="text-sm">
            Page {pageNumber}/{numPages}
          </label>
          <button onClick={goToNextPage} disabled={isLastPage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-up text-stone-500 hover:text-stone-900"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
              />
            </svg>
          </button>
          <div className="flex space-x-2">
            <button onClick={zoomOut} className="text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"
                />
                <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z" />
                <path
                  fillRule="evenodd"
                  d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </button>
            <button onClick={zoomIn} className="text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"
                />
                <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z" />
                <path
                  fillRule="evenodd"
                  d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<LoadingScreen />}
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          scale={scale} // Dynamically scale the page
          renderMode="canvas" // Ensure high-quality rendering
        />
      </Document>
    </section>
  );
};

export default PDFViewer;
