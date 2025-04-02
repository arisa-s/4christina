"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRef } from "react";

export function ImageLink({
  src,
  alt,
  href,
  className,
  style,
}: {
  src: string | StaticImport;
  alt: string;
  href: string;
  className?: string;
  style?: React.CSSProperties;
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
      <div>
        <Link href={href}>
          <Image
            src={src}
            alt={alt}
            className={className}
            style={style}
            priority
          />
        </Link>
      </div>
    </motion.div>
  );
}
