"use client";

import { motion, useInView } from "framer-motion";
import { AutoplayVideo } from "../shared/AutoplayVideo";
import { useRef } from "react";

export function VideoLink({
  src,
  href,
  width,
  height,
  className,
  type,
}: {
  src: string;
  href: string;
  width: number;
  height: number;
  className: string;
  type?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AutoplayVideo
        src={src}
        href={href}
        width={width}
        height={height}
        className={className}
        type={type}
      />
    </motion.div>
  );
}
