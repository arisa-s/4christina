"use client";

import { AutoplayVideo } from "../shared/AutoplayVideo";
import { FadeInView } from "../shared/FadeInView";

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
  return (
    <FadeInView>
      <AutoplayVideo
        src={src}
        href={href}
        width={width}
        height={height}
        className={className}
        type={type}
      />
    </FadeInView>
  );
}
