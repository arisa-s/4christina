import Link from "next/link";

import CardHeader from "@/components/shared/CardHeader";
import CardTag from "@/components/shared/CardTag";
import Paragraph from "@/components/shared/Paragraph";
import { sanityFetch } from "@/sanity/fetch";
import { listMiscProse } from "@/sanity/queries/miscProse";
import { DimensionAdjustedImage } from "@/components/shared/DimensionAdjustedImage";
import Image from "next/image";

export default async function MiscProseListPage() {
  const miscProses = await sanityFetch({ query: listMiscProse });

  return (
    <div className="columns-2 md:columns-3 gap-6 md:gap-12 lg:gap-36 space-y-6 md:space-y-12 lg:space-y-24 md:pt-6 lg:pt-24 max-w-5xl mx-auto">
      {miscProses.map((miscProse) => (
        <div key={miscProse._id}>
          <Link href={`/misc-prose/${miscProse.slug.current}`}>
            <div className="space-y-4">
              {miscProse.image ? (
                <DimensionAdjustedImage
                  image={miscProse.image}
                  alt={miscProse.title || "Post Image"}
                />
              ) : (
                <div className="w-full h-48 bg-neutral-200">
                  <Image
                    className="w-full h-full object-contain p-12"
                    src="/logo.png"
                    width={1053}
                    height={536}
                    alt="Paratex"
                  />
                </div>
              )}
              <div>
                {miscProse.title && <CardTag>{miscProse.tag}</CardTag>}
                <CardHeader>{miscProse.title}</CardHeader>
                {miscProse.tag && (
                  <Paragraph type="secondary">{miscProse.sumarry}</Paragraph>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
