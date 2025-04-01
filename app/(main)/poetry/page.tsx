import Link from "next/link";
import { PortableText, type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import Header from "@/components/shared/Header";
import { sanityTextsComponents } from "@/components/sanity/sanityTextsComponents";

const POEMS_QUERY = `*[
  _type == "poem"
  && defined(slug.current)
]|order(year desc, publishedAt desc)`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const poems = await client.fetch<SanityDocument[]>(POEMS_QUERY, {}, options);

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
            <Header type="3">{year}</Header>
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
