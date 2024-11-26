import { PortableText, type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { haikuComponents } from "@/components/sanity/haikuComponents";

const HAIKUS_QUERY = `*[
  _type == "haiku"
]|order(publishedAt desc)`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const haikus = await client.fetch<SanityDocument[]>(
    HAIKUS_QUERY,
    {},
    options
  );

  return (
    <div className="max-w-3xl mx-auto p-12 space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-ebGaramond font-medium">
          Haiku definition:
        </h2>
        <HaikuDefinitionQuote
          quote="A speck of dust sitting on a cloudless mirror would strike the eye, we’d wish the world were"
          author="Saigyo (118.1190)"
        />
        <HaikuDefinitionQuote
          quote="A spectacle of a self pausing simultaneously separating into several entities"
          author="Shigenobu"
        />
        <HaikuDefinitionQuote
          quote="5-7-5 lineated"
          author="English speakers"
        />
        <HaikuDefinitionQuote
          quote="Exaggerated perspective"
          author="Issa, probably"
        />
        <HaikuDefinitionQuote
          quote="the essence of the haiku spirit’ as kaigaku or ‘humour’, ‘banter’, ‘witticism’, and placed ultimate importance on a vulgar (hizoku), lofty (coma), ‘making fun of something or someone’ (chakasu) act’, adding that ‘the superior function of chakasu applies to one’s own state where one can turn oneself and others into a void’"
          author="Nagata Koi"
        />
        <HaikuDefinitionQuote
          quote="‘shasei’ (copying what is observed) (think western painterly influence-realism"
          author="Masaoka Shiki"
        />
        <p className="">
          or RENGA (Poetic form which alternates 5-7-5 and 7-7 syllable verses
          up to fifty times, to a total of 100 verse units, normally composed by
          two or more persons, occasional; literary game. Relies on disjunctive
          linking): any two consecutive links or stanzas must make sense, but
          three may not) HAD HOKKU (Opening verse of Renga that eventually
          became haiku (independent)- 5-7-5 syllable, classically necessitating
          a toki(seasonal reference) and toza(occasional reference) requirement,
          Usually assigned to guest of honour or highest ranked amongst the
          poets assembled) WHICH BECAME HAIKU (written in a single line
          traditionally, broken into three lines in the western tradition/in
          modern avant-garde haiku).
        </p>
      </div>
      <div>
        <ul className="space-y-6">
          {haikus.map((haiku) => (
            <div key={haiku._id}>
              <div>
                {Array.isArray(haiku.body) && (
                  <PortableText
                    value={haiku.body}
                    components={haikuComponents}
                  />
                )}
              </div>
              <p className="text-sm text-secondary mt-2">
                - {new Date(haiku.publishedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

const HaikuDefinitionQuote = ({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) => (
  <div>
    <p className="italic">{quote}</p>
    <p className="text-secondary">- {author}</p>
  </div>
);
