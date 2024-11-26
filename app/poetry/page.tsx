import Link from "next/link";
import { PortableText, type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { haikuTitleComponents } from "@/components/sanity/haikuTitleComponents";

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

  return (
    <div className="mx-auto w-full p-12">
      <hr />
      {Object.entries(groupedPoems).map(([year, poems]) => (
        <>
          <div key={year} className="flex space-x-24 p-12">
            <h2 className="text-3xl font-medium font-ebGaramond">{year}</h2>
            <ul className="space-y-6">
              {poems.map((poem) => (
                <PoemLink poem={poem} key={poem._id} />
              ))}
            </ul>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
}

const PoemLink = ({ poem }: { poem: SanityDocument }) => {
  return (
    <li className="text-lg hover:text-red-800">
      <Link href={`/poetry/${poem.slug.current}`}>
        {Array.isArray(poem.body) && (
          <PortableText
            key={poem._id}
            value={poem.title}
            // @ts-ignore
            components={haikuTitleComponents}
          />
        )}
      </Link>
    </li>
  );
};
