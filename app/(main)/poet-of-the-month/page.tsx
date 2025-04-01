import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import CardHeader from "@/components/shared/CardHeader";
import CardTag from "@/components/shared/CardTag";
import { listPoetOfTheMonth } from "@/sanity/queries/poetOfTheMonth";
import { sanityFetch } from "@/sanity/fetch";
import { DimensionAdjustedImage } from "@/components/shared/DimensionAdjustedImage";

export default async function PoetsListPage() {
  const poetOfTheMonths = await sanityFetch({ query: listPoetOfTheMonth });

  return (
    <div className="mx-auto md:pt-6 lg:pt-12">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {poetOfTheMonths.map((poetOfTheMonth) => (
          <PoetCard poetOfTheMonth={poetOfTheMonth} key={poetOfTheMonth._id} />
        ))}
      </ul>
    </div>
  );
}

const PoetCard = ({ poetOfTheMonth }: { poetOfTheMonth: SanityDocument }) => {
  return (
    <li>
      <Link href={`poet-of-the-month/${poetOfTheMonth.slug.current}`}>
        <div className="space-y-2">
          {poetOfTheMonth.image ? (
            <DimensionAdjustedImage
              image={poetOfTheMonth.image}
              alt={poetOfTheMonth.poet || "Poet of the month Image"}
            />
          ) : null}
          <div>
            <CardTag>{poetOfTheMonth.month}</CardTag>
            <CardHeader>{poetOfTheMonth.poet}</CardHeader>
          </div>
        </div>
      </Link>
    </li>
  );
};
