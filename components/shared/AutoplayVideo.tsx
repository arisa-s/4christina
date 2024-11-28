import Link from "next/link";
import ConditionalWrap from "../ConditionalWrap";

export function AutoplayVideo({
  src,
  width,
  height,
  type = "video/mp4",
  className,
  href,
}: {
  src: string;
  width?: number;
  height?: number;
  type?: string;
  className?: string;
  href?: string;
}) {
  return (
    <ConditionalWrap
      condition={!!href}
      wrapper={(children) => (
        <div>
          <Link href={href!}>{children}</Link>
        </div>
      )}
    >
      <video
        width={width}
        height={height}
        autoPlay
        loop
        muted
        className={className}
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
    </ConditionalWrap>
  );
}
