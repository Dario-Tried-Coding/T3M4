import { Config, Schema } from "@t3m4/types";
import { isPlainObject } from "../../helpers";
import { createError, pushError } from "../../helpers/error";
import { ValidationError, ValidationResult } from "../../types/error";
import { ErrorCode } from "../../types/error/error-codes";
import { validateIsland } from "./validate-island";

export function validateConfig(schema: Schema.Generic, input: unknown): ValidationResult<Config.Static> {
  const errors: ValidationError[] = [];
  const sanitized: Config.Static = {};

  if (!isPlainObject(input)) {
    const code: ErrorCode = Array.isArray(input) ? "CONFIG_ROOT_IS_ARRAY" : "CONFIG_ROOT_NOT_OBJECT";

    pushError(
      errors,
      createError({
        code,
        path: [],
        value: input,
        message: "Invalid config root: expected an object mapping islands to config objects.",
      }),
    );

    const result: ValidationResult<Config.Static> = {
      ok: false,
      value: {} as Config.Static,
      errors,
    };

    return result;
  }

  const configRoot = input as Record<string, unknown>;

  for (const [islandName, schemaIsland] of Object.entries(schema)) {
    const islandPath = [islandName];
    const rawConfigIsland = configRoot[islandName];

    if (rawConfigIsland === undefined) {
      pushError(
        errors,
        createError({
          code: "CONFIG_ISLAND_MISSING",
          path: islandPath,
          value: rawConfigIsland,
          message: `Missing config for island "${islandName}".`,
        }),
      );
      continue;
    }

    const validatedIsland = validateIsland(islandName, schemaIsland, rawConfigIsland, errors);
    if (validatedIsland) sanitized[islandName] = validatedIsland;
  }

  for (const islandName of Object.keys(configRoot)) {
    if (!(islandName in schema)) {
      const islandPath = [islandName];
      pushError(
        errors,
        createError({
          code: "CONFIG_ISLAND_UNKNOWN",
          path: islandPath,
          value: configRoot[islandName],
          message: `Unexpected island "${islandName}" in config: not defined in schema.`,
        }),
      );
    }
  }

  const result: ValidationResult<Config.Static> = {
    ok: errors.length === 0,
    value: sanitized,
    errors,
  };

  return result;
}
