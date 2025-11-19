import { Config, Schema } from "@t3m4/types";
import { isPlainObject } from "../../helpers";
import { createError, pushError } from "../../helpers/error";
import { PathSegment, ValidationError } from "../../types/error";

export function validateFacet(
  islandName: string,
  facetName: string,
  schemaFacet: Schema.Generic.Island.Facets.Facet,
  rawConfigFacet: unknown,
  path: PathSegment[],
  errors: ValidationError[],
): Config.Static.Island.Facets.Facet | undefined {
  if (!isPlainObject(rawConfigFacet)) {
    const code = Array.isArray(rawConfigFacet) ? "CONFIG_FACET_CONFIG_IS_ARRAY" : "CONFIG_FACET_CONFIG_NOT_OBJECT";
    pushError(
      errors,
      createError({
        code,
        path,
        value: rawConfigFacet,
        message: `Invalid config for facet "${facetName}" in island "${islandName}": expected { default: string, store?: boolean }.`,
      }),
    );
    return undefined;
  }

  const obj = rawConfigFacet as Record<string, unknown>;
  const { default: def, store, ...rest } = obj;

  for (const extraKey of Object.keys(rest)) {
    pushError(
      errors,
      createError({
        code: "CONFIG_FACET_UNKNOWN_KEY",
        path: [...path, extraKey],
        value: obj[extraKey],
        message: `Unknown key "${extraKey}" in config for facet "${facetName}" in island "${islandName}".`,
      }),
    );
  }

  if (typeof def !== "string" || def.trim().length === 0) {
    pushError(
      errors,
      createError({
        code: "CONFIG_FACET_DEFAULT_NOT_ALLOWED",
        path: [...path, "default"],
        value: def,
        message: `Invalid "default" for facet "${facetName}" in island "${islandName}": must be a non-empty string.`,
      }),
    );
    return undefined;
  }

  if (typeof schemaFacet === "string") {
    if (def !== schemaFacet) {
      pushError(
        errors,
        createError({
          code: "CONFIG_FACET_DEFAULT_NOT_ALLOWED",
          path: [...path, "default"],
          value: def,
          message: `Invalid "default" for facet "${facetName}" in island "${islandName}": expected exactly "${schemaFacet}".`,
        }),
      );
      return undefined;
    }
  } else {
    if (!schemaFacet.includes(def)) {
      pushError(
        errors,
        createError({
          code: "CONFIG_FACET_DEFAULT_NOT_ALLOWED",
          path: [...path, "default"],
          value: def,
          message: `Invalid "default" for facet "${facetName}" in island "${islandName}": must be one of [${schemaFacet.join(
            ", ",
          )}].`,
        }),
      );
      return undefined;
    }
  }

  if (store !== undefined && typeof store !== "boolean") {
    pushError(
      errors,
      createError({
        code: "CONFIG_FACET_STORE_INVALID_TYPE",
        path: [...path, "store"],
        value: store,
        message: `Invalid "store" for facet "${facetName}" in island "${islandName}": must be a boolean when provided.`,
      }),
    );
    return undefined;
  }

  const sanitized: { default: string; store?: boolean } = { default: def };
  if (store !== undefined) sanitized.store = store;

  return sanitized;
}
