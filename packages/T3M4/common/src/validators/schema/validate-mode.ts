import { Schema } from "@t3m4/types";
import { isPlainObject } from "../../helpers";
import { createError, pushError } from "../../helpers/error";
import { PathSegment, ValidationError } from "../../types/error";

interface ModeValidationResult {
  ok: boolean;
  value: Schema.Generic.Island.Facets.Mode | undefined;
}

export function validateMode(input: unknown, path: PathSegment[], errors: ValidationError[]): ModeValidationResult {
  if (typeof input === "string") return validateModeString(input, path, errors);

  if (Array.isArray(input)) return validateModeArray(input, path, errors);

  if (isPlainObject(input)) return validateModeObject(input, path, errors);

  pushError(
    errors,
    createError({
      code: "MODE_INVALID_TYPE",
      path,
      value: input,
      message: `Invalid "mode": expected string | string[] | { light, dark, system?, custom? }.`,
    }),
  );

  return { ok: false, value: undefined };
}

function validateModeString(input: string, path: PathSegment[], errors: ValidationError[]): ModeValidationResult {
  if (input.trim().length === 0) {
    pushError(
      errors,
      createError({
        code: "MODE_STRING_EMPTY",
        path,
        value: input,
        message: `"mode" as string must not be empty.`,
      }),
    );
    return { ok: false, value: undefined };
  }

  return { ok: true, value: input };
}

function validateModeArray(input: unknown[], path: PathSegment[], errors: ValidationError[]): ModeValidationResult {
  // TODO: regole per array non vuoto, elementi string non vuote
  if (input.length === 0) {
    pushError(
      errors,
      createError({
        code: "MODE_ARRAY_EMPTY",
        path,
        value: input,
        message: '"mode" as string[] must not be an empty array.',
      }),
    );
    return { ok: false, value: undefined };
  }

  let hasInvalidItem = false;

  for (let i = 0; i < input.length; i++) {
    const item = input[i];
    const itemPath = [...path, i];

    if (typeof item !== "string") {
      hasInvalidItem = true;
      pushError(
        errors,
        createError({
          code: "MODE_ARRAY_INVALID_ITEM",
          path: itemPath,
          value: item,
          message: '"mode" array items must all be non-empty strings.',
        }),
      );
      continue;
    }

    if (item.trim().length === 0) {
      hasInvalidItem = true;
      pushError(
        errors,
        createError({
          code: "MODE_ARRAY_INVALID_ITEM",
          path: itemPath,
          value: item,
          message: '"mode" array items must not be empty strings.',
        }),
      );
      continue;
    }
  }

  if (hasInvalidItem) return { ok: false, value: undefined };

  return { ok: true, value: input as string[] };
}

function validateModeObject(
  input: Record<string, unknown>,
  path: PathSegment[],
  errors: ValidationError[],
): ModeValidationResult {
  // TODO: validare:
  // - light string non vuota
  // - dark string non vuota
  // - system? string non vuota (se presente)
  // - custom? string[] non vuoto con elementi non vuoti (se presente)
  // - se QUALSIASI di questi è invalid → droppi tutto l'oggetto mode

  const { light, dark, system, custom } = input;

  if (typeof light !== "string") {
    pushError(
      errors,
      createError({
        code: "MODE_OBJECT_MISSING_LIGHT",
        path: [...path, "light"],
        value: light,
        message: '"mode.light" is required and must be a non-empty string.',
      }),
    );
    return { ok: false, value: undefined };
  }

  if (light.trim().length === 0) {
    pushError(
      errors,
      createError({
        code: "MODE_OBJECT_LIGHT_EMPTY",
        path: [...path, "light"],
        value: light,
        message: '"mode.light" must not be an empty string.',
      }),
    );
    return { ok: false, value: undefined };
  }

  if (typeof dark !== "string") {
    pushError(
      errors,
      createError({
        code: "MODE_OBJECT_MISSING_DARK",
        path: [...path, "dark"],
        value: dark,
        message: '"mode.dark" is required and must be a non-empty string.',
      }),
    );
    return { ok: false, value: undefined };
  }

  if (dark.trim().length === 0) {
    pushError(
      errors,
      createError({
        code: "MODE_OBJECT_DARK_EMPTY",
        path: [...path, "dark"],
        value: dark,
        message: '"mode.dark" must not be an empty string.',
      }),
    );
    return { ok: false, value: undefined };
  }

  const modeObject: Schema.Generic.Island.Facets.Mode.System = {
    light,
    dark,
  };

  if (system !== undefined) {
    if (typeof system !== "string" || system.trim().length === 0) {
      pushError(
        errors,
        createError({
          code: "MODE_OBJECT_SYSTEM_EMPTY",
          path: [...path, "system"],
          value: system,
          message: '"mode.system" must be a non-empty string when provided.',
        }),
      );
      return { ok: false, value: undefined };
    }

    modeObject.system = system;
  }

  if (custom !== undefined) {
    if (!Array.isArray(custom)) {
      pushError(
        errors,
        createError({
          code: "MODE_OBJECT_CUSTOM_NOT_ARRAY",
          path: [...path, "custom"],
          value: custom,
          message: '"mode.custom" must be an array of strings when provided.',
        }),
      );
      return { ok: false, value: undefined };
    }

    if (custom.length === 0) {
      pushError(
        errors,
        createError({
          code: "MODE_OBJECT_CUSTOM_EMPTY",
          path: [...path, "custom"],
          value: custom,
          message: '"mode.custom" must not be an empty array when provided.',
        }),
      );
      return { ok: false, value: undefined };
    }

    let hasInvalidItem = false;

    for (let i = 0; i < custom.length; i++) {
      const item = custom[i];
      const itemPath = [...path, "custom", i];

      if (typeof item !== "string") {
        hasInvalidItem = true;
        pushError(
          errors,
          createError({
            code: "MODE_OBJECT_CUSTOM_INVALID_ITEM",
            path: itemPath,
            value: item,
            message: '"mode.custom" items must all be non-empty strings.',
          }),
        );
        continue;
      }

      if (item.trim().length === 0) {
        hasInvalidItem = true;
        pushError(
          errors,
          createError({
            code: "MODE_OBJECT_CUSTOM_INVALID_ITEM",
            path: itemPath,
            value: item,
            message: '"mode.custom" items must not be empty strings.',
          }),
        );
        continue;
      }
    }

    if (hasInvalidItem) return { ok: false, value: undefined };

    modeObject.custom = custom;
  }

  return { ok: true, value: modeObject };
}
