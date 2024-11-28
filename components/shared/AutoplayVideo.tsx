export function AutoplayVideo({
  src,
  width,
  height,
  type = "video/mp4",
  className,
}: {
  src: string;
  width?: number;
  height?: number;
  type?: string;
  className?: string;
}) {
  return (
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
  );
}
