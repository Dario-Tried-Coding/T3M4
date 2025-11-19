import { Config, Schema } from "@t3m4/types";
import { isPlainObject } from "../../helpers";
import { createError, pushError } from "../../helpers/error";
import { PathSegment, ValidationError } from "../../types/error";
import { ErrorCode } from "../../types/error/error-codes";
import { validateFacets } from "./validate-facets";
import { validateMode } from "./validate-mode";

export function validateIsland(
  islandName: string,
  schemaIsland: Schema.Generic.Island,
  rawConfigIsland: unknown,
  errors: ValidationError[],
): Config.Static.Island | undefined {
  const islandPath: PathSegment[] = [islandName];

  if (!isPlainObject(rawConfigIsland)) {
    const code: ErrorCode = Array.isArray(rawConfigIsland) ? "CONFIG_ISLAND_IS_ARRAY" : "CONFIG_ISLAND_NOT_OBJECT";

    pushError(
      errors,
      createError({
        code,
        path: islandPath,
        value: rawConfigIsland,
        message: `Invalid config for island "${islandName}": expected an object.`,
      }),
    );
    return undefined;
  }

  const schemaFacets = schemaIsland.facets;
  const schemaMode = schemaIsland.mode;
  const configIslandObj = rawConfigIsland as Record<string, unknown>;

  const validatedIsland: Config.Static.Island = {};
  let hasSomething = false;

  const rawConfigFacets = configIslandObj.facets;

  if (schemaFacets) {
    const facetsPath = [...islandPath, "facets"];
    const validatedFacets = validateFacets(islandName, schemaFacets, rawConfigFacets, facetsPath, errors);
    if (validatedFacets) {
      validatedIsland.facets = validatedFacets;
      hasSomething = true;
    }
  } else if (rawConfigFacets !== undefined) {
    pushError(
      errors,
      createError({
        code: "CONFIG_FACETS_UNEXPECTED",
        path: [...islandPath, "facets"],
        value: rawConfigFacets,
        message: `Island "${islandName}" has facets in config but no facets in schema.`,
      }),
    );
  }

  const rawConfigMode = configIslandObj.mode;
  if (schemaMode !== undefined) {
    const modePath = [...islandPath, "mode"];
    if (rawConfigMode === undefined) {
      pushError(
        errors,
        createError({
          code: "CONFIG_MODE_MISSING",
          path: modePath,
          value: rawConfigMode,
          message: `Missing "mode" config for island "${islandName}".`,
        }),
      );
    } else {
      const validatedMode = validateMode(islandName, schemaMode, rawConfigMode, modePath, errors);
      if (validatedMode !== undefined) {
        validatedIsland.mode = validatedMode;
        hasSomething = true;
      }
    }
  } else if (rawConfigMode !== undefined) {
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_UNEXPECTED",
        path: [...islandPath, "mode"],
        value: rawConfigMode,
        message: `Island "${islandName}" has "mode" config but no mode in schema.`,
      }),
    );
  }

  if (!hasSomething) {
    pushError(
      errors,
      createError({
        code: "CONFIG_ISLAND_EMPTY",
        path: islandPath,
        value: rawConfigIsland,
        message: `Config for island "${islandName}" is empty or invalid after validation.`,
      }),
    );
    return undefined;
  }

  return validatedIsland;
}
