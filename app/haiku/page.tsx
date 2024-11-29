import { PortableText, type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { haikuComponents } from "@/components/sanity/haikuComponents";
import Header from "@/components/shared/Header";
import Paragraph from "@/components/shared/Paragraph";
import BlogContainer from "@/components/shared/BlogContainer";
import Link from "../../components/shared/Link";

const HAIKUS_QUERY = `*[
  _type == "haiku"
]|order(publishedAt desc)`;

const options = { next: { revalidate: 30 } };

export default async function HaikuLogPage() {
  const haikus = await client.fetch<SanityDocument[]>(
    HAIKUS_QUERY,
    {},
    options
  );

  return (
    <div className="flex flex-col w-full md:mx-auto md:pt-6 lg:pt-12 space-y-6 md:space-y-12">
      <div>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {haikus.map((haiku) => (
            <div
              key={haiku._id}
              className="flex flex-col bg-secondary-bg rounded-md p-4"
            >
              <div>
                {Array.isArray(haiku.body) && (
                  <PortableText
                    value={haiku.body}
                    components={haikuComponents}
                  />
                )}
              </div>
              <p className="text-sm text-secondary mt-2 ml-auto">
                - {new Date(haiku.publishedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </ul>
      </div>

      <Link
        href="/haiku/haiku-definition"
        className="underline text-lg md:text-xl ml-auto"
        target="_self"
      >
        Haiku Definition
      </Link>
    </div>
  );
}
