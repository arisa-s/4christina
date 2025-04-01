import Link from "next/link";

import CardHeader from "@/components/shared/CardHeader";
import CardTag from "@/components/shared/CardTag";
import Paragraph from "@/components/shared/Paragraph";
import { sanityFetch } from "@/sanity/fetch";
import { listMiscProse } from "@/sanity/queries/miscProse";
import { DimensionAdjustedImage } from "@/components/shared/DimensionAdjustedImage";

export default async function MiscProseListPage() {
  const miscProses = await sanityFetch({ query: listMiscProse });

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 md:pt-6 lg:pt-12">
      {miscProses.map((miscProse) => (
        <li key={miscProse._id}>
          <Link href={`/misc-prose/${miscProse.slug.current}`}>
            <div className="space-y-2">
              {miscProse.image && (
                <DimensionAdjustedImage
                  image={miscProse.image}
                  alt={miscProse.title || "Post Image"}
                />
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
        </li>
      ))}
    </ul>
  );
}
