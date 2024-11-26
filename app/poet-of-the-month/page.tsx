import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

const POETS_QUERY = `*[
  _type == "poetOfTheMonth"
  && defined(slug.current)
]|order(publishedAt desc)`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const poetOfTheMonths = await client.fetch<SanityDocument[]>(
    POETS_QUERY,
    {},
    options
  );

  return (
    <div>
      <ul className="grid grid-cols-6 gap-4">
        {poetOfTheMonths.map((poetOfTheMonth) => (
          <PoetCard poetOfTheMonth={poetOfTheMonth} key={poetOfTheMonth._id} />
        ))}
      </ul>
    </div>
  );
}

const PoetCard = ({ poetOfTheMonth }: { poetOfTheMonth: SanityDocument }) => {
  const poetOfTheMonthImageUrl = poetOfTheMonth.image
    ? urlFor(poetOfTheMonth.image)?.width(150).height(200).url()
    : null;

  return (
    <li>
      <Link href={`poet-of-the-month/${poetOfTheMonth.slug.current}`}>
        <div className="space-y-2">
          {poetOfTheMonthImageUrl && (
            <img
              src={poetOfTheMonthImageUrl}
              alt={poetOfTheMonth.poet}
              width="150"
              height="300"
            />
          )}
          <div>
            <p className="text-sm text-secondary">{poetOfTheMonth.month}</p>
            <h2 className="text-base font-bold text-primary">
              {poetOfTheMonth.poet}
            </h2>
          </div>
        </div>
      </Link>
    </li>
  );
};
