import Link from "next/link";
import { PortableText, type SanityDocument } from "next-sanity";

import { sanityTextsComponents } from "@/components/sanity/sanityTextsComponents";
import { sanityFetch } from "@/sanity/fetch";
import { listPoetry } from "@/sanity/queries/poetry";

export default async function IndexPage() {
  const poems = await sanityFetch({ query: listPoetry });

  const groupedPoems = poems.reduce(
    (acc: Record<string, SanityDocument[]>, poem) => {
      const year = poem.year || "Unknown Year";
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(poem);
      return acc;
    },
    {}
  );

  // Sort the grouped poems by year in descending order
  const sortedGroupedPoems = Object.entries(groupedPoems).sort(
    ([yearA], [yearB]) => {
      const numA = yearA === "Unknown Year" ? -Infinity : parseInt(yearA, 10);
      const numB = yearB === "Unknown Year" ? -Infinity : parseInt(yearB, 10);
      return numB - numA;
    }
  );

  return (
    <div className="mx-auto md:w-full md:pt-6 lg:pt-12" key="poetry-links">
      <hr />
      {sortedGroupedPoems.map(([year, poems]) => (
        <div key={year}>
          <div className="flex space-x-6 md:space-x-24 py-4 md:p-12">
            <h6 className="text-secondary">{year}</h6>
            <ul className="space-y-6">
              {poems.map((poem) => (
                <PoemLink poem={poem} key={poem._id} />
              ))}
            </ul>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

const PoemLink = ({ poem }: { poem: SanityDocument }) => {
  return (
    <li className="hover:text-red-800">
      <Link href={`/poetry/${poem.slug.current}`}>
        {Array.isArray(poem.body) && (
          <PortableText
            key={poem._id}
            value={poem.title}
            components={sanityTextsComponents}
          />
        )}
      </Link>
    </li>
  );
};
