import { Schema } from "@t3m4/types";
import { hasSpaces, isPlainObject } from "../../helpers";
import { createError, pushError } from "../../helpers/error";
import { PathSegment, ValidationError, ValidationResult } from "../../types/error";
import { validateFacets } from "./validate-facets";
import { validateMode } from "./validate-mode";

export function validateSchema(input: unknown): ValidationResult<Schema.Generic> {
  const errors: ValidationError[] = [];
  const sanitized: Schema.Generic = {};

  if (!isPlainObject(input)) {
    if (Array.isArray(input)) {
      pushError(
        errors,
        createError({
          code: "ROOT_IS_ARRAY",
          path: [],
          value: input,
          message: "Invalid root configuration: expected an object, received an array.",
        }),
      );
    } else {
      pushError(
        errors,
        createError({
          code: "ROOT_NOT_OBJECT",
          path: [],
          value: input,
          message: `Invalid root configuration: expected an object, received ${typeof input}.`,
        }),
      );
    }

    return {
      ok: false,
      value: {} as Schema.Generic,
      errors,
    };
  }

  const root = input as Record<string, unknown>;

  for (const [islandKey, rawIsland] of Object.entries(root)) {
    const islandPath: PathSegment[] = [islandKey];

    if (islandKey.length === 0) {
      pushError(
        errors,
        createError({
          code: "ISLAND_KEY_EMPTY",
          path: islandPath,
          value: islandKey,
          message: "Island key cannot be empty.",
        }),
      );
      continue;
    }

    if (hasSpaces(islandKey)) {
      pushError(
        errors,
        createError({
          code: "ISLAND_KEY_HAS_SPACES",
          path: islandPath,
          value: islandKey,
          message: `Island key "${islandKey}" must not contain spaces.`,
        }),
      );
      continue;
    }

    if (!isPlainObject(rawIsland)) {
      const code = Array.isArray(rawIsland) ? "ISLAND_VALUE_IS_ARRAY" : "ISLAND_VALUE_NOT_OBJECT";

      pushError(
        errors,
        createError({
          code,
          path: islandPath,
          value: rawIsland,
          message: `Invalid island value for key "${islandKey}": expected an object.`,
        }),
      );

      continue;
    }

    const rawIslandObj = rawIsland as Record<string, unknown>;
    const validatedIsland: Schema.Generic.Island = {};

    let hasValidFacets = false;
    let hasValidMode = false;

    for (const [key, value] of Object.entries(rawIslandObj)) {
      const propPath = [...islandPath, key];

      if (key === "facets") {
        const result = validateFacets(value, propPath, errors);
        if (result.ok && result.value) {
          validatedIsland.facets = result.value;
          hasValidFacets = true;
        }
        continue;
      }

      if (key === "mode") {
        const result = validateMode(value, propPath, errors);
        if (result.ok && result.value !== undefined) {
          validatedIsland.mode = result.value;
          hasValidMode = true;
        }
        continue;
      }

      pushError(
        errors,
        createError({
          code: "ISLAND_UNKNOWN_KEY",
          path: propPath,
          value,
          message: `Unknown key "${key}" in island "${islandKey}". Only "facets" and "mode" are allowed.`,
        }),
      );
    }

    if (!hasValidFacets && !hasValidMode) {
      pushError(
        errors,
        createError({
          code: "ISLAND_EMPTY_OBJECT",
          path: islandPath,
          value: rawIsland,
          message: `Island "${islandKey}" is empty after validation: at least one of "facets" or "mode" must be valid.`,
        }),
      );
      continue;
    }

    sanitized[islandKey] = validatedIsland;
  }

  return {
    ok: errors.length === 0,
    value: sanitized,
    errors,
  };
}
