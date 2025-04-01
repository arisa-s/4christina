import { type SchemaTypeDefinition } from "sanity";
import { haikuType } from "./haikuType";
import { poemType } from "./poemType";
import { miscProseType } from "./miscProseType";
import { poetOfTheMonthType } from "./poetOfTheMonthType";
import { readingLogType } from "./readingLogType";
import { inspirationType } from "./inspirationType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    haikuType,
    miscProseType,
    poetOfTheMonthType,
    poemType,
    readingLogType,
    inspirationType,
  ],
};
