import { Config, Schema } from "@t3m4/types";
import { isPlainObject } from "../../helpers";
import { createError, pushError } from "../../helpers/error";
import { PathSegment, ValidationError } from "../../types/error";

export function validateMode(
  islandName: string,
  schemaMode: Schema.Generic.Island.Facets.Mode,
  rawConfigMode: unknown,
  path: PathSegment[],
  errors: ValidationError[],
) {
  if (!isPlainObject(rawConfigMode)) {
    const code = Array.isArray(rawConfigMode) ? "CONFIG_MODE_IS_ARRAY" : "CONFIG_MODE_NOT_OBJECT";

    pushError(
      errors,
      createError({
        code,
        path,
        value: rawConfigMode,
        message: `Invalid "mode" config for island "${islandName}": expected an object.`,
      }),
    );
    return undefined;
  }

  if (typeof schemaMode === "string") {
    return validateModeForStringSchema(islandName, schemaMode, rawConfigMode as Record<string, unknown>, path, errors);
  }

  if (Array.isArray(schemaMode)) {
    return validateModeForArraySchema(islandName, schemaMode, rawConfigMode as Record<string, unknown>, path, errors);
  }

  return validateModeForObjectSchema(
    islandName,
    schemaMode as {
      light: string;
      dark: string;
      system?: string;
      custom?: string[];
    },
    rawConfigMode as Record<string, unknown>,
    path,
    errors,
  );
}

type Controller = NonNullable<Config.Static.Island.Mode.Mono["controller"]>;
function isController(v: unknown): v is Controller {
  return v === "class" || v === "attribute" || v === "data-attribute";
}

function validateStoreAndController(
  islandName: string,
  path: PathSegment[],
  obj: Record<string, unknown>,
  errors: ValidationError[],
) {
  const { store, controller } = obj;

  if (store !== undefined && typeof store !== "boolean") {
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_STORE_INVALID_TYPE",
        path: [...path, "store"],
        value: store,
        message: `Invalid "store" in mode config for island "${islandName}": must be boolean when provided.`,
      }),
    );
    return undefined;
  }

  if (controller !== undefined) {
    if (typeof controller === "string") {
      if (!isController(controller)) {
        pushError(
          errors,
          createError({
            code: "CONFIG_MODE_CONTROLLER_INVALID_VALUE",
            path: [...path, "controller"],
            value: controller,
            message: `Invalid "controller" value "${controller}" for island "${islandName}".`,
          }),
        );
        return undefined;
      }
    } else if (Array.isArray(controller)) {
      if (controller.length === 0) {
        pushError(
          errors,
          createError({
            code: "CONFIG_MODE_CONTROLLER_INVALID_TYPE",
            path: [...path, "controller"],
            value: controller,
            message: `Invalid "controller" for island "${islandName}": array must not be empty.`,
          }),
        );
        return undefined;
      }
      for (let i = 0; i < controller.length; i++) {
        const item = controller[i];
        if (!isController(item)) {
          pushError(
            errors,
            createError({
              code: "CONFIG_MODE_CONTROLLER_INVALID_VALUE",
              path: [...path, "controller", i],
              value: item,
              message: `Invalid "controller" item "${String(item)}" for island "${islandName}".`,
            }),
          );
          return undefined;
        }
      }
    } else {
      pushError(
        errors,
        createError({
          code: "CONFIG_MODE_CONTROLLER_INVALID_TYPE",
          path: [...path, "controller"],
          value: controller,
          message: `Invalid "controller" for island "${islandName}": expected "class" | "attribute" | "data-attribute" or an array of these.`,
        }),
      );
      return undefined;
    }
  }

  const out: { store?: boolean; controller?: Controller } = {};
  if (store !== undefined) out.store = store as boolean;
  if (controller !== undefined) out.controller = controller as Controller;

  return out;
}

function validateModeForStringSchema(
  islandName: string,
  schemaMode: string,
  obj: Record<string, unknown>,
  path: PathSegment[],
  errors: ValidationError[],
): Config.Static.Island.Mode.Mono | undefined {
  const { default: def, colorScheme, ...rest } = obj;

  // chiavi extra (oltre store/controller gestite a parte)
  for (const extraKey of Object.keys(rest)) {
    if (extraKey === "store" || extraKey === "controller") continue;
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_UNKNOWN_KEY",
        path: [...path, extraKey],
        value: obj[extraKey],
        message: `Unknown key "${extraKey}" in "mode" config for island "${islandName}".`,
      }),
    );
  }

  const common = validateStoreAndController(islandName, path, obj, errors);
  if (!common) return undefined;

  // default
  if (typeof def !== "string" || def.trim().length === 0) {
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_STRING_DEFAULT_EMPTY",
        path: [...path, "default"],
        value: def,
        message: `Invalid "default" in mode config for island "${islandName}": must be a non-empty string.`,
      }),
    );
    return undefined;
  }

  if (def !== schemaMode) {
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_STRING_DEFAULT_MISMATCH",
        path: [...path, "default"],
        value: def,
        message: `Invalid "default" in mode config for island "${islandName}": expected exactly "${schemaMode}".`,
      }),
    );
    return undefined;
  }

  // colorScheme
  if (colorScheme !== "light" && colorScheme !== "dark") {
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_STRING_COLOR_SCHEME_INVALID",
        path: [...path, "colorScheme"],
        value: colorScheme,
        message: `Invalid "colorScheme" in mode config for island "${islandName}": expected "light" or "dark".`,
      }),
    );
    return undefined;
  }

  return {
    ...common,
    default: def,
    colorScheme,
  } as Config.Static.Island.Mode.Mono;
}

function validateModeForArraySchema(
  islandName: string,
  schemaModes: string[],
  obj: Record<string, unknown>,
  path: PathSegment[],
  errors: ValidationError[],
): Config.Static.Island.Mode.Multi | undefined {
  const { default: def, colorSchemes, ...rest } = obj;

  for (const extraKey of Object.keys(rest)) {
    if (extraKey === "store" || extraKey === "controller") continue;
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_UNKNOWN_KEY",
        path: [...path, extraKey],
        value: obj[extraKey],
        message: `Unknown key "${extraKey}" in "mode" config for island "${islandName}".`,
      }),
    );
  }

  const common = validateStoreAndController(islandName, path, obj, errors);
  if (!common) return undefined;

  // default
  if (typeof def !== "string" || def.trim().length === 0) {
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_ARRAY_DEFAULT_INVALID",
        path: [...path, "default"],
        value: def,
        message: `Invalid "default" in mode config for island "${islandName}": must be a non-empty string.`,
      }),
    );
    return undefined;
  }

  if (!schemaModes.includes(def)) {
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_ARRAY_DEFAULT_NOT_IN_OPTIONS",
        path: [...path, "default"],
        value: def,
        message: `Invalid "default" in mode config for island "${islandName}": must be one of [${schemaModes.join(
          ", ",
        )}].`,
      }),
    );
    return undefined;
  }

  // colorSchemes
  if (!isPlainObject(colorSchemes)) {
    const code = Array.isArray(colorSchemes)
      ? "CONFIG_MODE_ARRAY_COLOR_SCHEMES_IS_ARRAY"
      : "CONFIG_MODE_ARRAY_COLOR_SCHEMES_NOT_OBJECT";

    pushError(
      errors,
      createError({
        code,
        path: [...path, "colorSchemes"],
        value: colorSchemes,
        message: `Invalid "colorSchemes" in mode config for island "${islandName}": expected an object mapping each mode to "light" | "dark".`,
      }),
    );
    return undefined;
  }

  const csObj = colorSchemes as Record<string, unknown>;

  // deve contenere come chiavi TUTTE le stringhe dello schema
  for (const mode of schemaModes) {
    if (!(mode in csObj)) {
      pushError(
        errors,
        createError({
          code: "CONFIG_MODE_ARRAY_COLOR_SCHEMES_KEY_MISSING",
          path: [...path, "colorSchemes", mode],
          value: undefined,
          message: `Missing key "${mode}" in "colorSchemes" for island "${islandName}".`,
        }),
      );
      return undefined;
    }
  }

  // segnalazione chiavi extra (non vietato a livello di specifica, ma io lo rendo errore strict)
  for (const key of Object.keys(csObj)) {
    if (!schemaModes.includes(key)) {
      pushError(
        errors,
        createError({
          code: "CONFIG_MODE_ARRAY_COLOR_SCHEMES_UNEXPECTED_KEY",
          path: [...path, "colorSchemes", key],
          value: csObj[key],
          message: `Unexpected key "${key}" in "colorSchemes" for island "${islandName}".`,
        }),
      );
      return undefined;
    }
  }

  // tutti i valori devono essere "light" | "dark"
  const sanitizedColorSchemes: Record<string, "light" | "dark"> = {};

  for (const [key, value] of Object.entries(csObj)) {
    if (value !== "light" && value !== "dark") {
      pushError(
        errors,
        createError({
          code: "CONFIG_MODE_ARRAY_COLOR_SCHEMES_INVALID_VALUE",
          path: [...path, "colorSchemes", key],
          value,
          message: `Invalid value for "colorSchemes.${key}" in island "${islandName}": expected "light" or "dark".`,
        }),
      );
      return undefined;
    }
    sanitizedColorSchemes[key] = value;
  }

  return {
    ...common,
    default: def,
    colorSchemes: sanitizedColorSchemes,
  } as Config.Static.Island.Mode.Multi;
}

function validateModeForObjectSchema(
  islandName: string,
  schemaMode: Schema.Generic.Island.Facets.Mode.System,
  obj: Record<string, unknown>,
  path: PathSegment[],
  errors: ValidationError[],
): Config.Static.Island.Mode.System | undefined {
  const { default: def, fallback, colorSchemes, ...rest } = obj;

  for (const extraKey of Object.keys(rest)) {
    if (extraKey === "store" || extraKey === "controller") continue;
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_UNKNOWN_KEY",
        path: [...path, extraKey],
        value: obj[extraKey],
        message: `Unknown key "${extraKey}" in "mode" config for island "${islandName}".`,
      }),
    );
  }

  const common = validateStoreAndController(islandName, path, obj, errors);
  if (!common) return undefined;

  const allowedDefaults = new Set<string>([schemaMode.light, schemaMode.dark]);
  if (schemaMode.system) allowedDefaults.add(schemaMode.system);
  if (schemaMode.custom) schemaMode.custom.forEach((c) => allowedDefaults.add(c));

  // default obbligatorio, in allowedDefaults
  if (typeof def !== "string" || def.trim().length === 0) {
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_OBJECT_DEFAULT_INVALID",
        path: [...path, "default"],
        value: def,
        message: `Invalid "default" in mode config for island "${islandName}": must be a non-empty string.`,
      }),
    );
    return undefined;
  }

  if (!allowedDefaults.has(def)) {
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_OBJECT_DEFAULT_NOT_IN_ALLOWED_SET",
        path: [...path, "default"],
        value: def,
        message: `Invalid "default" in mode config for island "${islandName}": must be one of light/dark/system/custom values from schema.`,
      }),
    );
    return undefined;
  }

  // fallback richiesto se schema ha system
  if (schemaMode.system) {
    if (typeof fallback !== "string" || fallback.trim().length === 0) {
      pushError(
        errors,
        createError({
          code: "CONFIG_MODE_OBJECT_FALLBACK_MISSING_WHEN_SYSTEM",
          path: [...path, "fallback"],
          value: fallback,
          message: `Missing or invalid "fallback" in mode config for island "${islandName}": required because schema.mode has "system".`,
        }),
      );
      return undefined;
    }

    if (!allowedDefaults.has(fallback)) {
      pushError(
        errors,
        createError({
          code: "CONFIG_MODE_OBJECT_FALLBACK_INVALID",
          path: [...path, "fallback"],
          value: fallback,
          message: `Invalid "fallback" in mode config for island "${islandName}": must be one of light/dark/custom values from schema.`,
        }),
      );
      return undefined;
    }
  } else if (fallback !== undefined) {
    // opzionale se vuoi vietare fallback quando schema non ha system
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_OBJECT_FALLBACK_UNEXPECTED",
        path: [...path, "fallback"],
        value: fallback,
        message: `Unexpected "fallback" in mode config for island "${islandName}": schema.mode has no "system".`,
      }),
    );
    return undefined;
  }

  // colorSchemes richiesto se schema ha custom
  let sanitizedColorSchemes: Record<string, "light" | "dark"> | undefined;

  if (schemaMode.custom && schemaMode.custom.length > 0) {
    if (!isPlainObject(colorSchemes)) {
      const code = Array.isArray(colorSchemes)
        ? "CONFIG_MODE_OBJECT_COLOR_SCHEMES_IS_ARRAY"
        : "CONFIG_MODE_OBJECT_COLOR_SCHEMES_NOT_OBJECT";

      pushError(
        errors,
        createError({
          code,
          path: [...path, "colorSchemes"],
          value: colorSchemes,
          message: `Invalid "colorSchemes" in mode config for island "${islandName}": required because schema.mode has "custom".`,
        }),
      );
      return undefined;
    }

    const csObj = colorSchemes as Record<string, unknown>;

    // deve contenere tutte le chiavi custom
    for (const key of schemaMode.custom) {
      if (!(key in csObj)) {
        pushError(
          errors,
          createError({
            code: "CONFIG_MODE_OBJECT_COLOR_SCHEMES_KEY_MISSING",
            path: [...path, "colorSchemes", key],
            value: undefined,
            message: `Missing key "${key}" in "colorSchemes" for island "${islandName}".`,
          }),
        );
        return undefined;
      }
    }

    // chiavi extra vietate (strict)
    for (const key of Object.keys(csObj)) {
      if (!schemaMode.custom.includes(key)) {
        pushError(
          errors,
          createError({
            code: "CONFIG_MODE_OBJECT_COLOR_SCHEMES_UNEXPECTED_KEY",
            path: [...path, "colorSchemes", key],
            value: csObj[key],
            message: `Unexpected key "${key}" in "colorSchemes" for island "${islandName}".`,
          }),
        );
        return undefined;
      }
    }

    sanitizedColorSchemes = {};

    for (const [key, value] of Object.entries(csObj)) {
      if (value !== "light" && value !== "dark") {
        pushError(
          errors,
          createError({
            code: "CONFIG_MODE_OBJECT_COLOR_SCHEMES_INVALID_VALUE",
            path: [...path, "colorSchemes", key],
            value,
            message: `Invalid value for "colorSchemes.${key}" in island "${islandName}": expected "light" or "dark".`,
          }),
        );
        return undefined;
      }
      sanitizedColorSchemes[key] = value;
    }
  } else if (colorSchemes !== undefined) {
    // se schema non ha custom ma config sì → errore (strict)
    pushError(
      errors,
      createError({
        code: "CONFIG_MODE_OBJECT_COLOR_SCHEMES_UNEXPECTED_KEY",
        path: [...path, "colorSchemes"],
        value: colorSchemes,
        message: `Unexpected "colorSchemes" in mode config for island "${islandName}": schema.mode has no "custom".`,
      }),
    );
    return undefined;
  }

  const result: Config.Static.Island.Mode.System = {
    ...common,
    default: def,
  };

  if (fallback !== undefined) result.fallback = fallback;
  if (sanitizedColorSchemes) result.colorSchemes = sanitizedColorSchemes;

  return result;
}
