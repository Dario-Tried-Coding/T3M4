import { Config, Schema } from "@t3m4/types";
import { isPlainObject } from "../../helpers";
import { createError, pushError } from "../../helpers/error";
import { PathSegment, ValidationError } from "../../types/error";
import { ErrorCode } from "../../types/error/error-codes";

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
  const hasSomething = false;

  const rawConfigFacets = configIslandObj.facets;
}
