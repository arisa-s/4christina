"use client";

import { useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";

// Show a loading text for first 2 seconds of page load
export function LoadingOverlay({
  overlayKey,
  text,
}: {
  overlayKey: string;
  text?: string;
}) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem(`${overlayKey}-hasVisited`);

    if (!hasVisited) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
      sessionStorage.setItem(`${overlayKey}-hasVisited`, "true"); // Mark as visited for this session

      const timer = setTimeout(() => {
        setShowLoading(false);
        document.body.style.overflow = "unset"; // Restore scrolling
      }, 5000);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset"; // Cleanup: ensure scrolling is restored
      };
    } else {
      setShowLoading(false); // Hide immediately if already visited
    }
  }, []);

  if (!showLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-surface-primary z-50 bg-white/20 backdrop-blur-sm">
      <div className="flex items-center justify-center">
        <Bars
          height="20"
          width="20"
          color="#FFFFF"
          ariaLabel="audio-loading"
          visible={true}
        />
        {text && <p className="text-white">{text}</p>}
      </div>
    </div>
  );
}
