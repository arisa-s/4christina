import { AutoplayVideo } from "@/components/shared/AutoplayVideo";
import Image from "next/image";
import Link from "next/link";

// Example image imports (adjust paths as needed)
import home1 from "../../public/homePoems/home-1.jpeg";
import home7 from "../../public/homePoems/home-7.png";
import home11 from "../../public/homePoems/home-11.png";
import home12 from "../../public/homePoems/home-12.jpeg";
import home15 from "../../public/homePoems/home-15.png";
import home3 from "../../public/homePoems/home-3.png";
import home6 from "../../public/homePoems/home-6.png";
import home8 from "../../public/homePoems/home-8.png";
import home10 from "../../public/homePoems/home-10.png";
import home13 from "../../public/homePoems/home-13.jpeg";

import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Home() {
  return (
    <div className="columns-2 md:columns-3 gap-4 space-y-6 md:ml-20">
      {/* Col 1 */}
      <ImageLink
        src={home1}
        href=""
        alt="hero"
        className="md:w-3/4 cursor-pointer"
      />
      <AutoplayVideo
        src="/homePoems/home-4.mov"
        href="/poetry/fervent-prophecy"
        width={396}
        height={924}
        // If it's a .mov, remove or change the type:
        // type="video/quicktime"
        className="ml-4 md:ml-0 w-3/5 md:w-1/2 cursor-pointer"
      />
      <ImageLink
        src={home7}
        href="/poetry/paper-hats"
        alt="hero"
        className="-ml-4 md:ml-0 w-4/5 md:w-3/4 cursor-pointer"
      />

      <div className="w-full h-20 md:h-60"></div>
      <div className="w-full h-10"></div>
      <ImageLink
        src={home11}
        href=""
        alt="hero"
        className="w-2/3 md:w-1/2 cursor-pointer"
      />
      <div className="md:hidden w-full h-10 md:h-60"></div>
      <ImageLink
        src={home12}
        href=""
        alt="hero"
        className="w-3/4 cursor-pointer"
      />

      {/* Col 2 (desktop) */}
      <AutoplayVideo
        src="/homePoems/home-2.mp4"
        href="/poetry/atomic-olive"
        width={1330}
        height={1836}
        type="video/mp4"
        className="w-full md:-ml-24 cursor-pointer"
      />
      {/* Col 2 (mobile) */}
      <AutoplayVideo
        src="/homePoems/home-5.mov"
        href="/poetry/kobayashi-issa"
        width={1440}
        height={1920}
        className="w-full pt-6 md:pt-0 cursor-pointer md:-ml-20"
      />
      <div className="hidden md:block w-full h-72"></div>
      <div className="hidden md:block w-full h-12"></div>
      <AutoplayVideo
        src="/homePoems/home-9.mp4"
        href="/poetry/chaulking-chatham-port"
        width={1146}
        height={1042}
        className="w-4/5 -ml-12 md:-ml-52 cursor-pointer"
      />
      <div className="md:hidden w-full h-6"></div>
      <AutoplayVideo
        src="/homePoems/home-14.mp4"
        href="/poetry/black-rock-seaside"
        width={1014}
        height={1136}
        className="w-full -ml-6 md:-ml-24 cursor-pointer"
      />
      <ImageLink
        src={home15}
        href="http://localhost:3000/poetry/turbulent-waters"
        alt="hero"
        className="w-2/3 md:-ml-24 cursor-pointer"
      />

      {/* Col 3 (desktop) */}
      <ImageLink
        src={home3}
        href=""
        alt="hero"
        className="w-full -ml-20 cursor-pointer"
      />
      <ImageLink
        src={home6}
        href="/poetry/empty-air"
        alt="hero"
        className="w-5/6 md:-ml-4 cursor-pointer"
      />
      <div className="hidden md:block w-full h-12"></div>
      <ImageLink
        src={home8}
        href="/poetry/the-mist"
        alt="hero"
        className="w-4/5 md:w-full -ml-12 md:-ml-20 cursor-pointer"
      />

      <div className="hidden md:block w-full h-20"></div>
      <ImageLink
        src={home10}
        href=""
        alt="hero"
        className="w-full md:-ml-40 cursor-pointer"
        style={{ height: "23%" }}
      />
      <div className="w-full h-20 md:h-80"></div>
      <ImageLink
        src={home13}
        href="poetry/point-being"
        alt="hero"
        className="w-2/3 md:w-full md:-ml-20 cursor-pointer"
      />
    </div>
  );
}

// Helper component for images
function ImageLink({
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
  );
}
