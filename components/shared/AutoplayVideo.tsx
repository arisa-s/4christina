"use client";

import Link from "next/link";
import { useState } from "react";
import FadeInOnLoad from "./FadeInOnLoad";
import ConditionalWrap from "./ConditionalWrap";

export function AutoplayVideo({
  src,
  width,
  height,
  type,
  className,
  href,
}: {
  src: string;
  width?: number;
  height?: number;
  type?: string; // e.g. "video/mp4" or "video/quicktime"
  className?: string;
  href?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadedData = () => {
    // Called when enough data is available to play
    setIsLoaded(true);
  };

  // The <video> itself:
  const videoElement = (
    <FadeInOnLoad isLoaded={true}>
      <video
        width={width}
        height={height}
        autoPlay
        loop
        muted
        playsInline
        className={`object-cover ${className ?? ""}`}
        onLoadedData={handleLoadedData}
      >
        {
          // If using .mov files, you may want to remove "type" or set to "video/quicktime"
          // for MP4, type="video/mp4".
        }
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
    </FadeInOnLoad>
  );

  // If an `href` is passed, wrap the video in a link
  return (
    <ConditionalWrap
      condition={!!href}
      wrapper={(children) => (
        <div>
          <Link href={href!}>{children}</Link>
        </div>
      )}
    >
      {videoElement}
    </ConditionalWrap>
  );
}
