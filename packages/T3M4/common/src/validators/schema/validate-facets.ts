import { Schema } from "@t3m4/types";
import { hasSpaces, isPlainObject } from "../../helpers";
import { createError, pushError } from "../../helpers/error";
import { PathSegment, ValidationError } from "../../types/error";

interface FacetsValidationResult {
  ok: boolean;
  value: Schema.Generic.Island["facets"];
}

export function validateFacets(input: unknown, path: PathSegment[], errors: ValidationError[]): FacetsValidationResult {
  if (!isPlainObject(input)) {
    const code = Array.isArray(input) ? "FACETS_IS_ARRAY" : "FACETS_NOT_OBJECT";

    pushError(
      errors,
      createError({
        code,
        path,
        value: input,
        message: `Invalid "facets": expected a non-empty object.`,
      }),
    );

    return { ok: false, value: undefined };
  }

  const rawFacets = input as Record<string, unknown>;
  const sanitizedFacets: NonNullable<Schema.Generic.Island["facets"]> = {};
  let hasAnyFacet = false;

  for (const [facetKey, rawFacetValue] of Object.entries(rawFacets)) {
    const facetPath = [...path, facetKey];

    if (facetKey.length === 0) {
      pushError(
        errors,
        createError({
          code: "FACET_KEY_EMPTY",
          path: facetPath,
          value: facetKey,
          message: "Facet key cannot be empty.",
        }),
      );
      continue;
    }

    if (hasSpaces(facetKey)) {
      pushError(
        errors,
        createError({
          code: "FACET_KEY_HAS_SPACES",
          path: facetPath,
          value: facetKey,
          message: `Facet key ${facetKey} must not contain spaces.`,
        }),
      );
      continue;
    }

    const validatedFacetValue = validateFacetValue(rawFacetValue, facetPath, errors);
    if (validatedFacetValue === undefined) continue;

    sanitizedFacets[facetKey] = validatedFacetValue;
    hasAnyFacet = true;
  }

  if (!hasAnyFacet) {
    pushError(
      errors,
      createError({
        code: "FACETS_EMPTY",
        path,
        value: input,
        message: `"facets" must not be empty after validation.`,
      }),
    );
    return { ok: false, value: undefined };
  }

  return { ok: true, value: sanitizedFacets };
}

function validateFacetValue(
  input: unknown,
  path: PathSegment[],
  errors: ValidationError[],
): Schema.Generic.Island.Facets.Facet | undefined {
  if (typeof input === "string") {
    const str = input;

    if (str.trim().length === 0) {
      pushError(
        errors,
        createError({
          code: "FACET_VALUE_STRING_EMPTY",
          path,
          value: input,
          message: "Facet value as string cannot be empty.",
        }),
      );
      return undefined;
    }

    return str;
  }

  if (Array.isArray(input)) {
    const arr = input;

    if (input.length === 0) {
      pushError(
        errors,
        createError({
          code: "FACET_VALUE_ARRAY_EMPTY",
          path,
          value: input,
          message: "Facet value array must not be empty.",
        }),
      );
      return undefined;
    }

    let hasInvalidItem = false;

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const itemPath = [...path, i];

      if (typeof item !== "string") {
        hasInvalidItem = true;
        pushError(
          errors,
          createError({
            code: "FACET_VALUE_ARRAY_INVALID_ITEM",
            path: itemPath,
            value: item,
            message: "Facet array item must be a string.",
          }),
        );
        continue;
      }

      if (item.trim().length === 0) {
        hasInvalidItem = true;
        pushError(
          errors,
          createError({
            code: "FACET_VALUE_ARRAY_INVALID_ITEM",
            path: itemPath,
            value: item,
            message: "Facet array item must not be an empty string.",
          }),
        );
        continue;
      }
    }

    if (hasInvalidItem) return undefined;

    return arr;
  }

  pushError(
    errors,
    createError({
      code: "FACET_VALUE_INVALID_TYPE",
      path,
      value: input,
      message: "Facet value must be a string or an array of strings.",
    }),
  );

  return undefined;
}
