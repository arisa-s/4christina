"use client";

import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { FadeInView } from "../shared/FadeInView";

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
  return (
    <FadeInView>
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
    </FadeInView>
  );
}
