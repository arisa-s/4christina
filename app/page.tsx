import { AutoplayVideo } from "@/components/AutoplayVideo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="columns-3 gap-4 space-y-6 ml-20">
      {/* Col 1 */}
      <Image
        src="/homePoems/home-1.jpeg"
        alt="hero"
        width={4284}
        height={5712}
        className="w-3/4"
      />
      <AutoplayVideo
        src="/homePoems/home-4.mov"
        width={396}
        height={924}
        className="w-1/2"
      />
      <Image
        src="/homePoems/home-7.png"
        alt="hero"
        width={338}
        height={638}
        className="w-3/4"
      />
      <div className="w-full h-60"></div>
      <div className="w-full h-10"></div>
      <Image
        src="/homePoems/home-11.png"
        alt="hero"
        width={602}
        height={1144}
        className="w-1/2"
      />
      <Image
        src="/homePoems/home-12.jpeg"
        alt="hero"
        width={4284}
        height={5712}
        className="w-3/4"
      />

      {/* Col 2 */}
      <AutoplayVideo
        src="/homePoems/home-2.mp4"
        width={1330}
        height={1836}
        className="w-full -ml-24"
      />
      <AutoplayVideo
        src="/homePoems/home-5.mov"
        width={1440}
        height={1920}
        className="w-full  -ml-20"
      />
      <div className="w-full h-72"></div>
      <div className="w-full h-12"></div>
      <AutoplayVideo
        src="/homePoems/home-9.mp4"
        width={1146}
        height={1042}
        className="w-4/5 -ml-52"
      />
      <AutoplayVideo
        src="/homePoems/home-14.mp4"
        width={1014}
        height={1136}
        className="w-full -ml-24"
      />
      <Image
        src="/homePoems/home-15.png"
        alt="hero"
        width={898}
        height={1008}
        className="w-2/3 -ml-24"
      />

      {/* Col 3 */}
      <Image
        src="/homePoems/home-3.png"
        alt="hero"
        width={933}
        height={509}
        className="w-full -ml-20"
      />
      <Image
        src="/homePoems/home-6.png"
        alt="hero"
        width={1028}
        height={1302}
        className="w-5/6 -ml-4"
      />
      <div className="w-full h-12"></div>
      <Image
        src="/homePoems/home-8.png"
        alt="hero"
        width={938}
        height={682}
        className="w-full -ml-20"
      />
      <div className="w-full h-20"></div>
      <Image
        src="/homePoems/home-10.png"
        alt="hero"
        width={2623}
        height={3076}
        className="w-full -ml-40"
        style={{ height: "23%" }}
      />
      <div className="w-full h-80"></div>
      <Image
        src="/homePoems/home-13.jpeg"
        alt="hero"
        width={3024}
        height={4032}
        className="w-full -ml-20"
      />
    </div>
  );
}
