import Link from "next/link";
import FadeInOnLoad from "./FadeInOnLoad";

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

  if (!href) return videoElement;

  return (
    <div className={`w-${width} h-${height}`}>
      <Link href={href}>{videoElement}</Link>
    </div>
  );
}
