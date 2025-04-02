"use client";

import { useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";

// Show a loading text for first 2 seconds of page load
export function LoadingOverlay({ overlayKey }: { overlayKey: string }) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem(`${overlayKey}-hasVisited`);

    if (!hasVisited) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
      sessionStorage.setItem(`${overlayKey}-hasVisited`, "true"); // Mark as visited for this session

      const timer = setTimeout(() => {
        setShowLoading(false);
        document.body.style.overflow = "unset"; // Restore scrolling
      }, 3000);

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
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}
