import { Config, Schema } from "@t3m4/types";
import { PathSegment, ValidationError } from "../../types/error";
import { isPlainObject } from "../../helpers";
import { createError, pushError } from "../../helpers/error";
import { validateFacet } from "./validate-facet";

export function validateFacets(
  islandName: string,
  schemaFacets: NonNullable<Schema.Generic.Island["facets"]>,
  rawConfigFacets: unknown,
  path: PathSegment[],
  errors: ValidationError[],
) {
  if (!isPlainObject(rawConfigFacets)) { 
    const code = Array.isArray(rawConfigFacets) ? "CONFIG_FACETS_IS_ARRAY" : "CONFIG_FACETS_NOT_OBJECT";

    pushError(
      errors,
      createError({
        code,
        path,
        value: rawConfigFacets,
        message: `Invalid "facets" config for island "${islandName}": expected an object mapping facets to { default, store? }.`,
      }),
    );
    return undefined;
  }

  const configFacetsObj = rawConfigFacets as Record<string, unknown>;
  const validatedFacets: NonNullable<Config.Static.Island["facets"]> = {};
  let hasAnyFacet = false

  for (const [facetName, schemaFacet] of Object.entries(schemaFacets)) {
    const facetPath = [...path, facetName];
    const rawConfigFacet = configFacetsObj[facetName];

    if (rawConfigFacet === undefined) {
      pushError(
        errors,
        createError({
          code: "CONFIG_FACET_MISSING",
          path: facetPath,
          value: rawConfigFacet,
          message: `Missing config for facet "${facetName}" in island "${islandName}".`,
        }),
      );
      continue;
    }

    const validatedFacet = validateFacet(islandName, facetName, schemaFacet, rawConfigFacet, facetPath, errors);
    if (validatedFacet) {
      validatedFacets[facetName] = validatedFacet;
      hasAnyFacet = true;
    }
  }

  for (const facetName of Object.keys(configFacetsObj)) {
    if (!(facetName in schemaFacets)) {
      const facetPath = [...path, facetName];
      pushError(
        errors,
        createError({
          code: "CONFIG_FACET_UNEXPECTED",
          path: facetPath,
          value: configFacetsObj[facetName],
          message: `Unexpected facet "${facetName}" in config for island "${islandName}".`,
        }),
      );
    }
  }

  if (!hasAnyFacet) return undefined;
  return validatedFacets;
}