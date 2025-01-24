"use client";

import { motion } from "framer-motion";
import React from "react";

type FadeInOnLoadProps = {
  children: React.ReactNode;
  isLoaded: boolean;
};

export default function FadeInOnLoad({
  children,
  isLoaded,
}: FadeInOnLoadProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      style={{
        // Hide the element until it's loaded (so it doesn't flash in partially):
        visibility: isLoaded ? "visible" : "hidden",
      }}
    >
      {children}
    </motion.div>
  );
}
